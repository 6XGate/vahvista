/* eslint-disable @typescript-eslint/no-explicit-any */
import test from "ava";
import validation from "../src";
import { passManyFailMany } from "./utils/macros";

const chain = validation.string.notEmpty.maxLength(3);

test("testing chain", passManyFailMany(chain),
    [ "a", "ab", "abc", "cde", "cd", "c" ],
    [ null, undefined, 4, NaN, "test", "settings" ],
);
