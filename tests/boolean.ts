import test from "ava";
import vahvista from "../src";
import { passManyFailMany, passOneFailMany } from "./utils/macros";

test("is true", passOneFailMany(vahvista.true), true,
    [ 1, "hey", {}, [], false, 0, "" ],
);

test("is truthy", passManyFailMany(vahvista.truthy),
    [ true, 1, "hey", {}, [] ],
    [ false, 0, "" ],
);

test("is false", passOneFailMany(vahvista.false), false,
    [ true, 1, "hey", {}, [], 0, "" ],
);

test("is falsy", passManyFailMany(vahvista.falsy),
    [ false, 0, "" ],
    [ true, 1, "hey", {}, [] ],
);
