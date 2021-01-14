import test from "ava";
import validation from "../src";
import { passManyFailMany } from "./utils/macros";

test("is length", passManyFailMany(validation.length(1)),
    [ "2", [2] ],
    [ "23", [ 2, 3 ] ],
);

test("is max length", passManyFailMany(validation.maxLength(2)),
    [ "23", [ 2, 3 ], "2", [2] ],
    [ "234", [ 2, 3, 4 ] ],
);

test("is min length", passManyFailMany(validation.minLength(2)),
    [ "23", [ 2, 3 ], "234", [ 2, 3, 4 ] ],
    [ "2", [2] ],
);
