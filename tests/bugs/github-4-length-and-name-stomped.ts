import test from "ava";
import vahvista from "../../src";
import { passManyFailMany } from "../utils/macros";

test("chaining length", passManyFailMany(vahvista.shape([vahvista.number]).length(1)),
    [ [2], [3] ],
    [ "23", [ 2, 3 ] ],
);

test("chaining name", passManyFailMany(vahvista.instanceOf(Error).name("Error")),
    [ new Error("hello"), new Error("world") ],
    [ new TypeError("hello"), new TypeError("world") ],
);
