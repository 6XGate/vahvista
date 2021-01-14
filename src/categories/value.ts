import { isNumber, toFinite } from "lodash";
import type { Value } from "../utils/types";
import { validation } from "../validation";

export const value = {
    isOneOf: validation.factory<Value>(
        "oneOf",
        (...values: Value[]) => _value => (isNumber(_value) ?
            values.map(toFinite).includes(_value) :
            values.includes(_value)),
    ),
    isEqual: validation.factory<Value>(
        "equal",
        (target: Value) => _value => _value === target,
    ),
    isNotEqual: validation.factory<Value>(
        "notEqual",
        (target: Value) => _value => _value !== target,
    ),
    isGreaterThan: validation.factory<Value>(
        "greaterThan",
        (target: Value) => _value => _value > target,
    ),
    isGreaterThanOrEqual: validation.factory<Value>(
        "greaterThanOrEqual",
        (target: Value) => _value => _value >= target,
    ),
    isLessThan: validation.factory<Value>(
        "lessThan",
        (target: Value) => _value => _value < target,
    ),
    isLessThanOrEqual: validation.factory<Value>(
        "lessThanOrEqual",
        (target: Value) => _value => _value <= target,
    ),
};

declare module "../validation" {
    interface Rules {
        oneOf<T>(...values: T[]): Predicate<T>;
        equal<T>(target: T): Predicate<T>;
        notEqual<T>(target: T): Predicate<T>;
        greaterThan<T>(target: T): Predicate<T>;
        greaterThanOrEqual<T>(target: T): Predicate<T>;
        lessThan<T>(target: T): Predicate<T>;
        lessThanOrEqual<T>(target: T): Predicate<T>;
    }
}
