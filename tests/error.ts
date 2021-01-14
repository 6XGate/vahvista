import test from "ava";
import validation from "../src";
import { passOneFailMany } from "./utils/macros";

test("is eval error", passOneFailMany(validation.evalError), new EvalError(),
    [ new Error(), new ReferenceError() ],
);

test("is range error", passOneFailMany(validation.rangeError), new RangeError(),
    [ new Error(), new ReferenceError() ],
);

test("is reference error", passOneFailMany(validation.referenceError), new ReferenceError(),
    [ new Error(), new URIError() ],
);

test("is syntax error", passOneFailMany(validation.syntaxError), new SyntaxError(),
    [ new Error(), new ReferenceError() ],
);

test("is type error", passOneFailMany(validation.typeError), new TypeError(),
    [ new Error(), new ReferenceError() ],
);

test("is uri error", passOneFailMany(validation.uriError), new URIError(),
    [ new Error(), new ReferenceError() ],
);
