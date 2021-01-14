import test from "ava";
import validation from "../src";
import { passOneFailMany, passOneFailOne } from "./utils/macros";

test("error name", passOneFailMany(validation.name("Error")), new Error(), [ new ReferenceError(), new TypeError() ]);

function goodName(): boolean { return true }
function badName(): boolean { return false }

test("function name", passOneFailOne(validation.name("goodName")), goodName, badName);
