import test from "ava";
import vahvista from "../src";
import { passOneFailMany, passOneFailOne } from "./utils/macros";

test("error name", passOneFailMany(vahvista.name("Error")), new Error(), [ new ReferenceError(), new TypeError() ]);

function goodName(): boolean { return true }
function badName(): boolean { return false }
function partialName(): boolean { return false }

test("function name", passOneFailOne(vahvista.name("goodName")), goodName, badName);
test("regex test name", passOneFailOne(vahvista.name(/^partial/u)), partialName, badName);
