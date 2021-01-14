import test from "ava";
import validation from "../src";
import { passManyFailMany, passOneFailMany } from "./utils/macros";

test("is true", passOneFailMany(validation.true), true,
    [ 1, "hey", {}, [], false, 0, "" ],
);

test("is truthy", passManyFailMany(validation.truthy),
    [ true, 1, "hey", {}, [] ],
    [ false, 0, "" ],
);

test("is false", passOneFailMany(validation.false), false,
    [ true, 1, "hey", {}, [], 0, "" ],
);

test("is falsy", passManyFailMany(validation.falsy),
    [ false, 0, "" ],
    [ true, 1, "hey", {}, [] ],
);
