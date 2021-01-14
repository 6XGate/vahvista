import { isFinite, isInteger } from "lodash";
import { inRange, isInfinite } from "../utils/checkers";
import { validation } from "../validation";

export const number = {
    isNegative: validation.register<number>(
        "negative",
        value => value < 0,
    ),
    isPositive: validation.register<number>(
        "positive",
        value => value > 0,
    ),
    isFinite: validation.register<number>(
        "finite",
        isFinite,
    ),
    isInfinite: validation.register<number>(
        "infinite",
        isInfinite,
    ),
    isUint32: validation.register<number>(
        "uint32",
        value => isInteger(value) && inRange(value, 0, 4294967295),
    ),
    isUint16: validation.register<number>(
        "uint16",
        value => isInteger(value) && inRange(value, 0, 65535),
    ),
    isUint8: validation.register<number>(
        "uint8",
        value => isInteger(value) && inRange(value, 0, 255),
    ),
    isInt32: validation.register<number>(
        "int32",
        value => isInteger(value) && inRange(value, -2147483648, 2147483647),
    ),
    isInt16: validation.register<number>(
        "int16",
        value => isInteger(value) && inRange(value, -32768, 32767),
    ),
    isInt8: validation.register<number>(
        "int8",
        value => isInteger(value) && inRange(value, -128, 127),
    ),
    isInteger: validation.register<number>(
        "integer",
        isInteger,
    ),
    isIntegerOrInfinite: validation.register<number>(
        "integerOrInfinite",
        value => isInteger(value) || isInfinite(value),
    ),
    inRange: validation.factory<number>(
        "inRange",
        (min: number, max: number) => value => inRange(value, min, max),
    ),
};

declare module "../validation" {
    interface Rules {
        negative: Predicate<number>;
        positive: Predicate<number>;
        finite: Predicate<number>;
        infinite: Predicate<number>;
        uint32: Predicate<number>;
        uint16: Predicate<number>;
        uint8: Predicate<number>;
        int32: Predicate<number>;
        int16: Predicate<number>;
        int8: Predicate<number>;
        integer: Predicate<number>;
        integerOrInfinite: Predicate<number>;
        inRange(min: number, max: number): Predicate<number>;
    }
}
