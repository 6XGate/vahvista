import test from "ava";
import validation from "../src";
import { passManyFailMany, passOneFailMany, passOneFailOne } from "./utils/macros";

test("is alphabetic", passOneFailOne(validation.alphabetic), "abcefzx", "az34df1x!");

test("is alpha numeric", passOneFailOne(validation.alphaNumeric), "az34dx11", "az34df1x!");

test("is date like", passManyFailMany(validation.dateLike),
    [ "2015-01-02", "2015/01/02", "01 Jan 1970 00:00:00 GMT", "2011-10-10T14:48:00" ],
    [ "2015+01+02", "32 Feb 1970 00:00:00 GMT" ],
);

test("is numeric", passManyFailMany(validation.numeric),
    [ "12", "-12", "-1.2" ],
    [ "12a", "x-12", "1,2" ],
);

test("is integral", passManyFailMany(validation.integral),
    [ "12", "-12" ],
    [ "12a", "x-12", "1,2", "-1.2" ],
);

test("is lower case", passOneFailMany(validation.lowerCase), "abc def", [ "Abc Def", "ABC DEF" ]);

test("is upper case", passOneFailMany(validation.upperCase), "ABC DEF", [ "Abc Def", "abc def" ]);

test("is url", passOneFailOne(validation.url), "https://www.example.com/xc?x=2", "https//www.example.com/xc__x\\2");

test("contains", passOneFailOne(validation.contains("abc")), "__ssabcss__", "__ssABCss__");

test("is ends with", passOneFailOne(validation.endsWith("ss__")), "__ssabcss__", "__ssabcs_");

test("is starts with", passOneFailOne(validation.startsWith("__ss")), "__ssabcss__", "_sabcss__");

test("is matches", passManyFailMany(validation.matches(/ab?c/u)),
    [ "ac", "abc", " ac ", " abc " ],
    [ " ad ", " adbc", "adc", "a cd " ],
);
