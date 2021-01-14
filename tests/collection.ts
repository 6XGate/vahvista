import test from "ava";
import validation from "../src";
import { passManyFailMany } from "./utils/macros";

test("is empty", passManyFailMany(validation.empty),
    [ "", [], {}, new Set(), new Map() ],
    [ "2", [2], { a: 2 }, new Set([2]), new Map([[ 1, 2 ]]) ],
);

test("is not empty", passManyFailMany(validation.notEmpty),
    [ "2", [2], { a: 2 }, new Set([2]), new Map([[ 1, 2 ]]) ],
    [ "", [], {}, new Set(), new Map() ],
);

test("is size", passManyFailMany(validation.size(1)),
    [ "2", [2], { a: 2 }, new Set([2]), new Map([[ 1, 2 ]]) ],
    [ "23", [ 2, 3 ], { a: 2, b: 3 }, new Set([ 2, 3 ]), new Map([ [ 1, 2 ], [ 2, 3 ] ]) ],
);

test("is max size", passManyFailMany(validation.maxSize(2)),
    [
        "23",
        [ 2, 3 ],
        { a: 2, b: 3 },
        new Set([ 2, 3 ]),
        new Map([ [ 1, 2 ], [ 2, 3 ] ]),
        "2",
        [2],
        { a: 2 },
        new Set([2]),
        new Map([[ 1, 2 ]]),
    ],
    [
        "234",
        [ 2, 3, 4 ],
        { a: 2, b: 3, c: 4 },
        new Set([ 2, 3, 4 ]),
        new Map([ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ]),
    ],
);

test("is min size", passManyFailMany(validation.minSize(2)),
    [
        "23",
        [ 2, 3 ],
        { a: 2, b: 3 },
        new Set([ 2, 3 ]),
        new Map([ [ 1, 2 ], [ 2, 3 ] ]),
        "234",
        [ 2, 3, 4 ],
        { a: 2, b: 3, c: 4 },
        new Set([ 2, 3, 4 ]),
        new Map([ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ]),
    ],
    [
        "2",
        [2],
        { a: 2 },
        new Set([2]),
        new Map([[ 1, 2 ]]),
    ],
);
