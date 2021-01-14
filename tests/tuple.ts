import test from "ava";
import vahvista from "../src";
import { passOneFailMany } from "./utils/macros";

const tuple = vahvista.tuple(vahvista.string, vahvista.number, vahvista.boolean);

test("not a tuple", passOneFailMany(tuple),
    [ "hey", 4, false ],
    [
        [ false, "hey", 4 ],
        [ false, "hey" ],
        100,
    ],
);
