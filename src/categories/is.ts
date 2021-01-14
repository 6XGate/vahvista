/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types */
import {
    isUndefined,
    isNull,
    isNil,
    isBoolean,
    isNumber,
    isNaN,
    isSymbol,
    isArrayLike,
    isArray,
    isString,
    isArrayBuffer,
    isBuffer,
    isTypedArray,
    isFunction,
    isRegExp,
    isObject,
    isError,
    isDate,
    isSet,
    isWeakSet,
    isMap,
    isWeakMap,
} from "lodash";
import type { TypedArray } from "type-fest";
import { isInstanceOf, isIterable, isIterator, isPromise, isValue } from "../utils/checkers";
import type { TypeOf, Types, Value } from "../utils/types";
import { validation } from "../validation";

export const is = {
    isUndefined:         validation.register("undefined", isUndefined),
    isNull:              validation.register("null", isNull),
    isNil:               validation.register("nil", isNil),
    isValue:             validation.register("value", isValue),
    isBoolean:           validation.register("boolean", isBoolean),
    isNumber:            validation.register("number", isNumber),
    isNaN:               validation.register("nan", isNaN),
    isSymbol:            validation.register("symbol", isSymbol),
    isArrayLike:         validation.register("arrayLike", isArrayLike),
    isArray:             validation.register("array", isArray),
    isString:            validation.register("string", isString),
    isArrayBuffer:       validation.register("arrayBuffer", isArrayBuffer),
    isBuffer:            validation.register("buffer", isBuffer),
    isDataView:          validation.register("dataView", isInstanceOf(DataView)),
    isTypedArray:        validation.register("typedArray", isTypedArray),
    isUint32Array:       validation.register("uint32Array", isInstanceOf(Uint32Array)),
    isUint16Array:       validation.register("uint16Array", isInstanceOf(Uint16Array)),
    isUint8Array:        validation.register("uint8Array", isInstanceOf(Uint8Array)),
    isInt32Array:        validation.register("int32Array", isInstanceOf(Int32Array)),
    isInt16Array:        validation.register("int16Array", isInstanceOf(Int16Array)),
    isInt8Array:         validation.register("int8Array", isInstanceOf(Int8Array)),
    isFloat64Array:      validation.register("float64Array", isInstanceOf(Float64Array)),
    isFloat32Array:      validation.register("float32Array", isInstanceOf(Float32Array)),
    isUint8ClampedArray: validation.register("uint8ClampedArray", isInstanceOf(Uint8ClampedArray)),
    isFunction:          validation.register("function", isFunction),
    isRegExp:            validation.register("regExp", isRegExp),
    isObject:            validation.register("object", isObject),
    isError:             validation.register("error", isError),
    isDate:              validation.register("date", isDate),
    isIterable:          validation.register("iterable", isIterable),
    isIterator:          validation.register("iterator", isIterator),
    isPromise:           validation.register("promise", isPromise),
    isSet:               validation.register("set", isSet),
    isWeakSet:           validation.register("weakSet", isWeakSet),
    isMap:               validation.register("map", isMap),
    isWeakMap:           validation.register("weakMap", isWeakMap),
    isEnum:              validation.factory<number|string>("enum", (values: (number|string)[]) => value => values.includes(value)),
    isTypeOf:            validation.factory("typeOf", (type: Types) => value => typeof value === type),
    isInstanceOf:        validation.factory("instanceOf", (type: new (...args: any[]) => any) => isInstanceOf(type)),
};

declare module "../validation" {
    interface Rules {
        undefined: Predicate<undefined>;
        null: Predicate<null>;
        nil: Predicate<undefined|null>;
        value: Predicate<Value>;
        boolean: Predicate<boolean>;
        number: Predicate<number>;
        nan: Predicate;
        symbol: Predicate<symbol>;
        arrayLike: Predicate<ArrayLike<unknown>>;
        array: Predicate<readonly unknown[]>;
        string: Predicate<string>;
        arrayBuffer: Predicate<ArrayBuffer>;
        buffer: Predicate<Buffer>;
        dataView: Predicate<DataView>;
        typedArray: Predicate<TypedArray>;
        uint32Array: Predicate<Uint32Array>;
        uint16Array: Predicate<Uint16Array>;
        uint8Array: Predicate<Uint8Array>;
        int32Array: Predicate<Int32Array>;
        int16Array: Predicate<Int16Array>;
        int8Array: Predicate<Int8Array>;
        float64Array: Predicate<Float64Array>;
        float32Array: Predicate<Float32Array>;
        uint8ClampedArray: Predicate<Uint8ClampedArray>;
        function: Predicate<(...args: any[]) => any>;
        regExp: Predicate<RegExp>;
        object: Predicate<object>;
        error: Predicate<Error>;
        date: Predicate<Date>;
        iterable: Predicate<Iterable<any>>;
        iterator: Predicate<Iterator<any, any, any>>;
        promise: Predicate<Promise<any>>;
        set: Predicate<Set<any>>;
        weakSet: Predicate<WeakSet<any>>;
        map: Predicate<Map<any, any>>;
        weakMap: Predicate<WeakMap<any, any>>;
        enum<E extends number|string>(values: readonly E[]): Predicate<E>;
        typeOf<T extends Types>(type: T): Predicate<TypeOf<T>>;
        instanceOf<C extends new (...args: any[]) => any>(type: C): Predicate<InstanceType<C>>;
    }
}
