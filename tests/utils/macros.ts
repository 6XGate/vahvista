import type { ExecutionContext } from "ava";
import { isObject, isString, isNil, isNull, isUndefined, toString } from "lodash";
import type { Predicate } from "../../src";

interface HasStringTag {
    readonly [Symbol.toStringTag]: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function hasStringTag(value: object): value is HasStringTag {
    return Symbol.toStringTag in value;
}

function stringify(value: unknown): string {
    if (isUndefined(value)) {
        return "undefined";
    } else  if (isNull(value)) {
        return "null";
    } else if (isObject(value)) {
        if (hasStringTag(value)) {
            return `[object ${value[Symbol.toStringTag]}]`;
        }

        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        return value.toString();
    } else if (isString(value)) {
        return `"${value}"`;
    }

    return toString(value);
}

type Should = "pass" | "fail";

function msg(value: unknown, should: Should, index?: number): string {
    return !isNil(index) ?
        `values[${index}]: ${stringify(value)} does not ${should}` :
        `${stringify(value)} does not ${should}`;
}

export const passOneFailOne = <T>(predicate: Predicate<T>) =>
    (t: ExecutionContext, is: T, isNot: unknown) => {
        t.true(predicate(is), msg(is, "pass"));
        t.false(predicate(isNot), msg(isNot, "fail"));
    };

export const passOneFailMany = <T>(predicate: Predicate<T>) =>
    (t: ExecutionContext, is: T, isNot: readonly unknown[]) => {
        t.true(predicate(is), msg(is, "pass"));
        isNot.forEach((value, index) => t.false(predicate(value), msg(value, "fail", index)));
    };

export const passManyFailOne = <T>(predicate: Predicate<T>) =>
    (t: ExecutionContext, is: readonly T[], isNot: unknown) => {
        is.forEach((value, index) => t.true(predicate(value), msg(value, "pass", index)));
        t.false(predicate(isNot), msg(isNot, "fail"));
    };

export const passManyFailMany = <T>(predicate: Predicate<T>) =>
    (t: ExecutionContext, is: readonly T[], isNot: readonly unknown[]) => {
        is.forEach((value, index) => t.true(predicate(value), msg(value, "pass", index)));
        isNot.forEach((value, index) => t.false(predicate(value), msg(value, "fail", index)));
    };
