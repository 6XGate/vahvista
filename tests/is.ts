import test, { todo } from "ava";
import { values } from "lodash";
import validation from "../src";
import { passManyFailMany, passManyFailOne, passOneFailMany, passOneFailOne } from "./utils/macros";

test("is undefined", passOneFailMany(validation.undefined), undefined, [ "undefined", 5 ]);

test("is null", passOneFailMany(validation.null), null, [ "null", 5 ]);

test("is nil", passManyFailMany(validation.nil), [ undefined, null ], [ "undefined", "null", 5 ]);

test("is value", passManyFailOne(validation.value), [ true, false, 5, BigInt(5), "hey" ], new Date());

test("is boolean", passManyFailMany(validation.boolean), [ true, false ], [ "true", "false", 5 ]);

test("is number", passManyFailMany(validation.number), [ 1, 1.2, -2 ], [ "2", "hey" ]);

test("is nan", passManyFailMany(validation.nan), [ NaN, -NaN ], [ "NaN", 5, "hey" ]);

test("is symbol", passManyFailMany(validation.symbol),
    [ Symbol("test"), Symbol.toStringTag ],
    [ "Symbol(test)", "hey", 5 ],
);

test("is array-like", passManyFailOne(validation.arrayLike), [ "test", [ 1, 2, 3 ] ], 5);

test("is array", passOneFailOne(validation.array), ["test"], 5);

test("is string", passOneFailOne(validation.string), "test", 5);

test("is array buffer", passOneFailOne(validation.arrayBuffer), new ArrayBuffer(5), 5);

test("is buffer", passOneFailOne(validation.buffer), Buffer.alloc(5), 5);

test("is data view", passOneFailOne(validation.dataView), new DataView(new ArrayBuffer(5)), 5);

test("is typed array", passManyFailMany(validation.typedArray), [
    new Uint32Array(5),
    new Uint16Array(5),
    new Uint8Array(5),
    new Int32Array(5),
    new Int16Array(5),
    new Int8Array(5),
    new Float64Array(5),
    new Float32Array(5),
    new Uint8ClampedArray(5),
], [
    new ArrayBuffer(5),
    new DataView(new ArrayBuffer(5)),
    5,
]);

test("is uint32 array", passOneFailOne(validation.uint32Array), new Uint32Array(5), new ArrayBuffer(5));

test("is uint16 array", passOneFailOne(validation.uint16Array), new Uint16Array(5), new ArrayBuffer(5));

test("is uint8 array", passOneFailOne(validation.uint8Array), new Uint8Array(5), new ArrayBuffer(5));

test("is int32 array", passOneFailOne(validation.int32Array), new Int32Array(5), new ArrayBuffer(5));

test("is int16 array", passOneFailOne(validation.int16Array), new Int16Array(5), new ArrayBuffer(5));

test("is int8 array", passOneFailOne(validation.int8Array), new Int8Array(5), new ArrayBuffer(5));

test("is float64 array", passOneFailOne(validation.float64Array), new Float64Array(5), new ArrayBuffer(5));

test("is float32 array", passOneFailOne(validation.float32Array), new Float32Array(5), new ArrayBuffer(5));

test("is uint8 clamped array", passOneFailOne(validation.uint8ClampedArray),
    new Uint8ClampedArray(5),
    new ArrayBuffer(5),
);

test("is function", passOneFailOne(validation.function), () => undefined, 5);

test("is regular expression", passOneFailOne(validation.regExp), /test/u, 5);

test("is object", passManyFailMany(validation.object),
    [ [], {}, new Date() ],
    [ 5, "hey", Symbol.toStringTag ],
);


test("is error", passManyFailMany(validation.error),
    [ new Error("tes"), new TypeError("tes"), new ReferenceError("tes") ],
    [ /test/u, new Date(), 5 ],
);

test("is date", passOneFailMany(validation.date), new Date(),
    [ 5, "2018-01-02", (new Date()).toString(), (new Date()).toLocaleDateString() ]);

const iterables = [ [], new Set<number>(), new Map<number, number>(), "hey" ];

test("is iterable", passManyFailMany(validation.iterable),
    [ [], new Set<number>(), new Map<number, number>(), "hey" ],
    [ {}, new WeakSet<RegExp>(), new WeakMap<RegExp, number>() ],
);

test("is iterator", passManyFailOne(validation.iterator), iterables.map(value => value[Symbol.iterator]()), 4);

test("is promise", passOneFailOne(validation.promise), Promise.resolve(5), 5);
todo("Need to test is promise against promise-like");

test("is set", passOneFailMany(validation.set), new Set<number>(), [ new WeakSet<RegExp>(), 5 ]);

test("is weak set", passOneFailMany(validation.weakSet), new WeakSet<RegExp>(), [ new Set<number>(), 5 ]);

test("is map", passOneFailMany(validation.map), new Map<number, number>(), [ new WeakMap<RegExp, number>(), 5 ]);

test("is weak map", passOneFailMany(validation.weakMap),
    new WeakMap<RegExp, number>(),
    [ new Map<number, number>(), 5 ],
);

enum Setting {
    general = "gen",
    advanced = "adv",
}

test("is enum: object style", passManyFailMany(validation.enum(values(Setting))),
    [ Setting.general, Setting.advanced, "gen" as Setting ],
    [ 2, "general", "advanced" ],
);

// eslint-disable-next-line @typescript-eslint/naming-convention
const Preferences = [ "general", "advanced" ] as const;
type Preferences = (typeof Preferences)[number];

test("is enum: union style", passManyFailMany(validation.enum(Preferences)),
    [ "general", "advanced" ],
    [ 2, "gen" as Preferences, Setting.general, Setting.advanced ],
);

test("is type of: undefined", passOneFailMany(validation.typeOf("undefined")), undefined, [ 5, null ]);

test("is type of: symbol", passOneFailMany(validation.typeOf("symbol")), Symbol("test"), [ 5, "Symbol(test)" ]);

test("is type of: bigint", passOneFailMany(validation.typeOf("bigint")), BigInt(5), [ 5, "5" ]);

test("is type of: string", passOneFailMany(validation.typeOf("string")), "hey", [ 5, null, undefined ]);

test("is type of: number", passOneFailMany(validation.typeOf("number")), 10, [ "5", BigInt(5) ]);

test("is type of: function", passOneFailMany(validation.typeOf("function")), () => undefined, [ undefined, null ]);

test("is type of: object", passManyFailMany(validation.typeOf("object")),
    [ null, {}, /test/u, new Date(), [ 5, 2, 1 ] ],
    [ 5, undefined, BigInt(5), Symbol("test") ],
);

test("is instance of: Direct", passOneFailMany(validation.instanceOf(Error)), new Error(),
    [ new Date(), /test/u ],
);

test("is instance of: Inherited", passOneFailMany(validation.instanceOf(Error)), new ReferenceError(),
    [ new Date(), /test/u ],
);
