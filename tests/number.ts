import test from "ava";
import validation from "../src";
import { passManyFailMany } from "./utils/macros";

test("is negative", passManyFailMany(validation.negative),
    [ -1, -2, -3, -4 ],
    [ 0, 1, 2, 3, 4 ],
);

test("is positive", passManyFailMany(validation.positive),
    [ 1, 2, 3, 4 ],
    [ 0, -1, -2, -3, -4 ],
);

test("is finite", passManyFailMany(validation.finite),
    [ 1, 2.3, -55, 0.1e100 ],
    [ Infinity, -Infinity ],
);

test("is infinite", passManyFailMany(validation.infinite),
    [ Infinity, -Infinity ],
    [ 1, 2.3, -55, 0.1e100 ],
);

test("is uint32", passManyFailMany(validation.uint32),
    [ 0, 1, 23, 55, 1002234, 4294967295 ],
    [ 2.3, -55, 0.1e100, 4294967296, "44", NaN, Infinity, -Infinity ],
);

test("is uint16", passManyFailMany(validation.uint16),
    [ 0, 1, 23, 55, 65535 ],
    [ 2.3, -55, 0.1e100, 65536, 1002234, 4294967295, "44", NaN, Infinity, -Infinity ],
);

test("is uint8", passManyFailMany(validation.uint8),
    [ 0, 1, 23, 55, 255 ],
    [ 2.3, -55, 0.1e100, 256, 1002234, 4294967295, "44", NaN, Infinity, -Infinity ],
);

test("is int32", passManyFailMany(validation.int32),
    [ -2147483648, -55, 0, 1, 23, 55, 1002234, 2147483647 ],
    [ -2147483649, 2.3, 0.1e100, 2147483648, "44", NaN, Infinity, -Infinity ],
);

test("is int16", passManyFailMany(validation.int16),
    [ -32768, -55, 0, 1, 23, 55, 32767 ],
    [ -32769, 2.3, 0.1e100, 32768, 1002234, 2147483646, "44", NaN, Infinity, -Infinity ],
);

test("is int8", passManyFailMany(validation.int8),
    [ -128, -55, 0, 1, 23, 55, 127 ],
    [ -129, 2.3, 0.1e100, 128, 1002234, 4294967295, "44", NaN, Infinity, -Infinity ],
);

test("is integer", passManyFailMany(validation.integer),
    [ -2147483649, -2147483648, -32769, -32768, -129, -128, -55, 0, 1, 23, 55, 128, 1002234, 4294967295 ],
    [ 2.3, "44", NaN, Infinity, -Infinity ],
);

test("is integer/infinity", passManyFailMany(validation.integerOrInfinite),
    [ -Infinity, -2147483648, -32769, -32768, -129, -128, -55, 0, 1, 23, 55, 128, 1002234, Infinity ],
    [ 2.3, "44", NaN ],
);

test("is in range", passManyFailMany(validation.inRange(-22, 22)),
    [ -22, -21, -11.5, 0, 11.5, 21, 22 ],
    [ -30, -23, 23, 30 ],
);
