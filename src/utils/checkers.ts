/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    get,
    isArray,
    isBoolean,
    isFunction,
    isInteger,
    isNil,
    isNumber,
    isObject,
    isString,
    isMap,
    isSet,
    isWeakSet,
    isWeakMap,
    toFinite,
} from "lodash";
import type {
    MaybePredicateInterface,
    PredicateInterface,
    Value,
} from "./types";

export function ignore(..._data: unknown[]): void { return undefined }

export function isPredicate(value: unknown): value is PredicateInterface {
    return isObject(value) ? Boolean((value as MaybePredicateInterface)["@isPredicate"]) : false;
}

export function isValue(value: unknown): value is Value {
    return isBoolean(value) || isNumber(value) || (typeof value === "bigint") || isString(value);
}

export function isInfinite(value: number): boolean {
    return value === Infinity || value === -Infinity;
}

export function inRange(value: number, min: number, max: number): boolean {
    min = toFinite(min); max = toFinite(max);
    const _min = Math.min(min, max);
    const _max = Math.max(min, max);

    return _min <= value && value <= _max;
}

type IsInstanceOfValidator<C> = (value: unknown) => value is C;
export function isInstanceOf<C extends new (...args: any[]) => any>(type: C): IsInstanceOfValidator<InstanceType<C>> {
    return (value): value is InstanceType<C> => isObject(value) && value instanceof type;
}

export function isIterable(value: unknown): value is Iterable<unknown> {
    return !isNil(value) && isFunction(get(value, Symbol.iterator));
}

export function isIterator(value: unknown): value is Iterator<unknown> {
    return isObject(value) && isFunction(get(value, "next"));
}

export function isNativePromise(value: unknown): value is Promise<unknown> {
    return value instanceof Promise;
}

export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
    // TODO: Test
    /* istanbul ignore next */
    return isObject(value) && isFunction(get(value, "then")) && isFunction(get(value, "catch"));
}

export function isPromise(value: unknown): value is Promise<unknown>|PromiseLike<unknown> {
    return isNativePromise(value) || isPromiseLike(value);
}

export function hasBase(target: any, key: any): boolean {
    if (isArray(target) && isInteger(key)) {
        return key >= 0 && key < target.length;
    }

    if (isWeakMap(target) || isWeakSet(target) || isMap(target) || isSet(target)) {
        return target.has(key);
    }

    if (isObject(target)) {
        return key in target;
    }

    return false;
}
