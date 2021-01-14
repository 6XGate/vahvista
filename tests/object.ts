import test from "ava";
import validation from "../src";
import { passOneFailMany } from "./utils/macros";

function block(code: () => void): void {
    code();
}

test("bad shape: root", t => {
    const oops = 5;
    t.throws(() => {
        // @ts-expect-error Testing checks in shape
        validation.shape(oops)(oops);
    }, {
        instanceOf: TypeError,
        message:    "Shape input not a valid value, expected a predicate, array, or object",
    });
});

test("bad shape: element", t => {
    const oops = { bad: 5 };
    t.throws(() => {
        // @ts-expect-error Testing checks in shape
        validation.shape(oops)(oops);
    }, {
        instanceOf: TypeError,
        message:    "Shape has invalid property at bad, expected a predicate, array, or object",
    });
});

block(() => {
    const shape = {
        base:   validation.string.startsWith("base_").minLength(6),
        points: [validation.integer],
        names:  {
            first: validation.string.notEmpty,
            last:  validation.string.notEmpty,
        }
    };

    const good = {
        base:   "base_set",
        points: [ 3, 5, 2, 1 ],
        names:  {
            first: "test",
            last:  "object",
        },
    };

    const notGood = [
        {
            base:   "b",
            points: [ ],
            names:  {
                first: "test",
                last:  "object",
            },
        },
        {
            base:   "base_set",
            points: 5,
            names:  {
                first: "test",
                last:  "object",
            },
        },
        10,
    ];

    test("shape", passOneFailMany(validation.shape(shape)), good, notGood);
});
