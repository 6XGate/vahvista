import test from "ava";
import vahvista from "../src";
import { passManyFailMany, passManyFailOne, passOneFailMany, passOneFailOne } from "./utils/macros";

test("oneOf: number", passManyFailMany(vahvista.oneOf(2, 3, 5, 7)),
    [ 2, 3, 5, 7 ],
    [ 1, 4 ],
);

test("oneOf: string", passManyFailMany(vahvista.oneOf("Sam", "Max", "Ratchet", "Clank")),
    [ "Sam", "Max", "Ratchet", "Clank" ],
    [ "Mario", "Luigi" ],
);

test("equal: number: 2", passOneFailMany(vahvista.equal(2)), 2, [ 1, 3, 4, 5 ]);
test("equal: number: 3", passOneFailMany(vahvista.equal(3)), 3, [ 1, 2, 4, 5 ]);

const yeahError = new Error("yeah");
const nopeError = new ReferenceError("nope");
const cloneError = new Error("yeah");

test("equal: object: simple", passOneFailOne(vahvista.equal(yeahError)), yeahError, nopeError);
test("equal: object: clone", passOneFailOne(vahvista.equal(yeahError)), yeahError, cloneError);

test("equal: string: hello", passOneFailOne(vahvista.equal("hello")), "hello", "hey");
test("equal: string: world", passOneFailOne(vahvista.equal("world")), "world", "Earth");

test("not equal: number: 2", passManyFailOne(vahvista.notEqual(2)), [ 1, 3, 4, 5 ], 2);
test("not equal: number: 3", passManyFailOne(vahvista.notEqual(3)), [ 1, 2, 4, 5 ], 3);

test("not equal: object: simple", passOneFailOne(vahvista.notEqual(yeahError)), nopeError, yeahError);
test("not equal: object: clone", passOneFailOne(vahvista.notEqual(yeahError)), cloneError, yeahError);

test("not equal: string: hello", passOneFailOne(vahvista.notEqual("hey")), "hello", "hey");
test("not equal: string: world", passOneFailOne(vahvista.notEqual("Earth")), "world", "Earth");

test("gt: number", passManyFailMany(vahvista.greaterThan(5)),
    [ 6, 7, 8 ],
    [ 3, 4, 5 ],
);

test("gt: string", passManyFailMany(vahvista.greaterThan("e")),
    [ "f", "g", "ge" ],
    [ "b", "c", "dd" ],
);

test("gte: number", passManyFailMany(vahvista.greaterThanOrEqual(5)),
    [ 5, 6, 7, 8 ],
    [ 3, 4 ],
);

test("gte: string", passManyFailMany(vahvista.greaterThanOrEqual("e")),
    [ "f", "g", "ge", "e" ],
    [ "b", "c", "dd" ],
);

test("lt: number", passManyFailMany(vahvista.lessThan(5)),
    [ 3, 4 ],
    [ 6, 7, 8 ],
);

test("lt: string", passManyFailMany(vahvista.lessThan("e")),
    [ "b", "c", "dd" ],
    [ "f", "g", "ge" ],
);

test("lte: number", passManyFailMany(vahvista.lessThanOrEqual(5)),
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
);

test("lte: string", passManyFailMany(vahvista.lessThanOrEqual("e")),
    [ "b", "c", "dd", "e" ],
    [ "f", "g", "ge" ],
);
