import test from "ava";
import validation from "../src";
import { passManyFailMany } from "./utils/macros";

const union = validation.or(validation.string, validation.integer, validation.shape([validation.string]).maxLength(2));

test("union", passManyFailMany(union),
    [
        "hey",
        12,
        [ "hey", "there" ],
    ],
    [
        new Error(),
        [ 2, 3 ],
        1.2,
    ],
);
