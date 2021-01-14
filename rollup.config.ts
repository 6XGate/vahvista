import path from "path";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import roller from "./build/roller";
import pkg from "./package.json";

export default roller([ "cjs", "esm", "iife" ], ({ configuration, target }, { globals, input, output }) => {
    // ### Common
    input({ input: "src/index.ts" });
    globals({ "lodash": "_" });

    // ### Production builds
    output(configuration === "prod", {
        plugins: [terser()],
    });

    // ### CommonJS configuration ("main")
    input(target === "cjs", {
        plugins: [
            typescript({
                module:        "esnext",
                target:        "es2015",
                noEmitOnError: true,
            }),
        ],
    });
    output(target === "cjs", {
        file:    pkg.main,
        format:  "commonjs",
        exports: "default",
    });

    // ### Module configuration ("module")
    input(target === "esm", {
        plugins: [
            typescript({
                module:         "esnext",
                target:         "es2015",
                noEmitOnError:  true,
                declaration:    true,
                declarationDir: path.dirname(pkg.typings),
                outDir:         "./dist/",
                rootDir:        "./src/",
                include:        ["./src/**/*.ts"],
            }),
        ],
    });
    output(target === "esm", {
        dir:            path.dirname(pkg.module),
        entryFileNames: path.basename(pkg.module),
        format:         "esm",
    });

    // ### Browser configuration ("browser")
    input(target === "iife", {
        plugins: [
            typescript({
                module:        "esnext",
                target:        "es2015",
                noEmitOnError: true,
            }),
        ],
    });
    output(target === "iife", {
        file:   pkg.browser,
        name:   "vahvista",
        format: "iife",
    });
});
