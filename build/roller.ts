import type { InputOptions, OutputOptions, RollupOptions } from "rollup";
import type { MergeStrategies } from "./merge";
import { ignore, merge, mergeInput, mergeMaybeArray, replace } from "./merge";
import type { SimpleGlobals } from "./utils";
import { makeExternals } from "./utils";

export type Configuration = "dev" | "prod";
export type Target = "cjs" | "esm" | "amd" | "umd" | "iife";
export type BuildVariables = { configuration: Configuration; target: Target; env: typeof process.env };

/** Contains the merge strategy for roller configuration. Anything not listed is automatically `ignore`. */
// ## Root
const coreStrategies: MergeStrategies = {
    // ### Core functionality
    external: ignore,
    input:    mergeInput,
    plugins:  mergeMaybeArray,

    // ### Advanced functionality
    onwarn:                  replace,
    preserveEntrySignatures: replace,
    strictDeprecations:      replace,

    // ## Output
    output: {
        // ### Core functionality
        dir:     replace,
        file:    replace,
        format:  replace,
        globals: ignore,
        name:    replace,
        plugins: mergeMaybeArray,

        // ### Advanced functionality
        assetFileNames:          replace,
        banner:                  replace,
        footer:                  replace,
        chunkFileNames:          replace,
        compact:                 replace,
        entryFileNames:          replace,
        extend:                  replace,
        hoistTransitiveImports:  replace,
        inlineDynamicImports:    replace,
        interop:                 replace,
        intro:                   replace,
        outro:                   replace,
        manualChunks:            replace,
        minifyInternalExports:   replace,
        paths:                   replace,
        preserveModules:         replace,
        preserveModulesRoot:     replace,
        sourcemap:               ignore,
        sourcemapExcludeSources: replace,
        sourcemapFile:           replace,
        sourcemapPathTransform:  replace,

        // ### Danger zone
        exports: replace,
    },
};

export type RollerContext = {
    readonly globals: (condition: boolean|SimpleGlobals, globals?: SimpleGlobals) => void;
    readonly input: (condition: boolean|InputOptions, input?: InputOptions) => void;
    readonly output: (condition: boolean|OutputOptions, output?: OutputOptions) => void;
    readonly override: (condition: boolean|RollupOptions, overrides?: RollupOptions) => void;
};

type RollerContextData = {
    config: RollupOptions;
    globals: SimpleGlobals;
};

function makeDefaultContextData(): RollerContextData {
    return {
        config:  { output: { sourcemap: true } },
        globals: { },
    };
}

function makeContext(data: RollerContextData): RollerContext {
    return {
        globals: (condition, globals) => {
            if (typeof condition === "object") {
                data.globals = { ...condition, ...globals };
            } else if (condition && globals) {
                data.globals = { ...data.globals, ...globals };
            }
        },
        input: (condition, input) => {
            if (typeof condition === "object") {
                merge(coreStrategies, data.config, condition);
            } else if (condition && input) {
                merge(coreStrategies, data.config, input);
            }
        },
        output: (condition, output) => {
            if (typeof condition === "object") {
                merge(coreStrategies, data.config, { output: condition });
            } else if (condition && output) {
                merge(coreStrategies, data.config, { output: output });
            }
        },
        override: (condition, overrides) => {
            if (typeof condition === "object") {
                merge(coreStrategies, data.config, condition);
            } else if (condition && overrides) {
                merge(coreStrategies, data.config, overrides);
            }
        },
    };
}

export type BuildConfiguration = (variables: BuildVariables, context: RollerContext) => void;

export default function roller(targets: Target[], config: BuildConfiguration): RollupOptions[] {
    const results: RollerContextData[] = [];
    for (const target of targets) {
        const variables: BuildVariables = {
            configuration: (process.env.CONFIGURATION || "dev") as Configuration,
            env:           process.env,
            target,
        };

        const data = makeDefaultContextData();
        const context = makeContext(data); // new RollerContext();
        config(variables, context);

        if (data.config.output) {
            if (Array.isArray(data.config.output)) {
                throw new Error("Not expecting options to be an array");
            }

            if (data.config.output.format === "umd" || data.config.output.format === "iife") {
                data.config.output.globals = { ...data.globals };
            }
        }

        data.config.external = makeExternals(data.globals);
        results.push(data);
    }

    return results.map(result => result.config);
}
