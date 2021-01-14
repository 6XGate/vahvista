import test from "ava";
import validation from "../src";
import { passManyFailMany, passManyFailOne, passOneFailMany, passOneFailOne } from "./utils/macros";

test("oneOf: number", passManyFailMany(validation.oneOf(2, 3, 5, 7)),
    [ 2, 3, 5, 7 ],
    [ 1, 4 ],
);

test("oneOf: string", passManyFailMany(validation.oneOf("Sam", "Max", "Ratchet", "Clank")),
    [ "Sam", "Max", "Ratchet", "Clank" ],
    [ "Mario", "Luigi" ],
);

test("equal: number: 2", passOneFailMany(validation.equal(2)), 2, [ 1, 3, 4, 5 ]);
test("equal: number: 3", passOneFailMany(validation.equal(3)), 3, [ 1, 2, 4, 5 ]);

const yeahError = new Error("yeah");
const nopeError = new ReferenceError("nope");
const cloneError = new Error("yeah");

test("equal: object: simple", passOneFailOne(validation.equal(yeahError)), yeahError, nopeError);
test("equal: object: clone", passOneFailOne(validation.equal(yeahError)), yeahError, cloneError);

test("equal: string: hello", passOneFailOne(validation.equal("hello")), "hello", "hey");
test("equal: string: world", passOneFailOne(validation.equal("world")), "world", "Earth");

test("not equal: number: 2", passManyFailOne(validation.notEqual(2)), [ 1, 3, 4, 5 ], 2);
test("not equal: number: 3", passManyFailOne(validation.notEqual(3)), [ 1, 2, 4, 5 ], 3);

test("not equal: object: simple", passOneFailOne(validation.notEqual(yeahError)), nopeError, yeahError);
test("not equal: object: clone", passOneFailOne(validation.notEqual(yeahError)), cloneError, yeahError);

test("not equal: string: hello", passOneFailOne(validation.notEqual("hey")), "hello", "hey");
test("not equal: string: world", passOneFailOne(validation.notEqual("Earth")), "world", "Earth");

test("gt: number", passManyFailMany(validation.greaterThan(5)),
    [ 6, 7, 8 ],
    [ 3, 4, 5 ],
);

test("gt: string", passManyFailMany(validation.greaterThan("e")),
    [ "f", "g", "ge" ],
    [ "b", "c", "dd" ],
);

test("gte: number", passManyFailMany(validation.greaterThanOrEqual(5)),
    [ 5, 6, 7, 8 ],
    [ 3, 4 ],
);

test("gte: string", passManyFailMany(validation.greaterThanOrEqual("e")),
    [ "f", "g", "ge", "e" ],
    [ "b", "c", "dd" ],
);

test("lt: number", passManyFailMany(validation.lessThan(5)),
    [ 3, 4 ],
    [ 6, 7, 8 ],
);

test("lt: string", passManyFailMany(validation.lessThan("e")),
    [ "b", "c", "dd" ],
    [ "f", "g", "ge" ],
);

test("lte: number", passManyFailMany(validation.lessThanOrEqual(5)),
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
);

test("lte: string", passManyFailMany(validation.lessThanOrEqual("e")),
    [ "b", "c", "dd", "e" ],
    [ "f", "g", "ge" ],
);
