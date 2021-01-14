import test from "ava";
import validation from "../src";
import { passOneFailMany } from "./utils/macros";

const tuple = validation.tuple(validation.string, validation.number, validation.boolean);

test("not a tuple", passOneFailMany(tuple),
    [ "hey", 4, false ],
    [
        [ false, "hey", 4 ],
        [ false, "hey" ],
        100,
    ],
);
