import path from "path";
import roller from "./build/roller";

export default roller(({ target, outPath, typings }, { typescript, globals, output }) => {
    if (!typings) {
        throw new Error("Missing typing output path");
    }

    // ### Common
    globals({ "lodash": "_" });

    // ### CommonJS configuration ("main")
    if (target === "cjs") {
        output({ exports: "default" });
    }

    // ### Module configuration ("module")
    if (target === "esm") {
        output({
            dir:            path.dirname(outPath),
            entryFileNames: path.basename(outPath),
        });
        typescript({
            module:         "esnext",
            target:         "es2015",
            noEmitOnError:  true,
            declaration:    true,
            declarationDir: path.dirname(typings),
            outDir:         path.dirname(outPath),
            rootDir:        "./src/",
            include:        ["./src/**/*.ts"],
        });
    }
});
