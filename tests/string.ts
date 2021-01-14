import test from "ava";
import vahvista from "../src";
import { passManyFailMany, passOneFailMany, passOneFailOne } from "./utils/macros";

test("is alphabetic", passOneFailOne(vahvista.alphabetic), "abcefzx", "az34df1x!");

test("is alpha numeric", passOneFailOne(vahvista.alphaNumeric), "az34dx11", "az34df1x!");

test("is date like", passManyFailMany(vahvista.dateLike),
    [ "2015-01-02", "2015/01/02", "01 Jan 1970 00:00:00 GMT", "2011-10-10T14:48:00" ],
    [ "2015+01+02", "32 Feb 1970 00:00:00 GMT" ],
);

test("is numeric", passManyFailMany(vahvista.numeric),
    [ "12", "-12", "-1.2" ],
    [ "12a", "x-12", "1,2" ],
);

test("is integral", passManyFailMany(vahvista.integral),
    [ "12", "-12" ],
    [ "12a", "x-12", "1,2", "-1.2" ],
);

test("is lower case", passOneFailMany(vahvista.lowerCase), "abc def", [ "Abc Def", "ABC DEF" ]);

test("is upper case", passOneFailMany(vahvista.upperCase), "ABC DEF", [ "Abc Def", "abc def" ]);

test("is url", passOneFailOne(vahvista.url), "https://www.example.com/xc?x=2", "https//www.example.com/xc__x\\2");

test("contains", passOneFailOne(vahvista.contains("abc")), "__ssabcss__", "__ssABCss__");

test("is ends with", passOneFailOne(vahvista.endsWith("ss__")), "__ssabcss__", "__ssabcs_");

test("is starts with", passOneFailOne(vahvista.startsWith("__ss")), "__ssabcss__", "_sabcss__");

test("is matches", passManyFailMany(vahvista.matches(/ab?c/u)),
    [ "ac", "abc", " ac ", " abc " ],
    [ " ad ", " adbc", "adc", "a cd " ],
);
