/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TypedArray } from '../utils/buffer'
import { isBuffer, isTypedArray } from '../utils/buffer'
import {
  isArrayBuffer,
  isArrayLike,
  isBoolean,
  isInstanceOf,
  isIterable,
  isIterator,
  isMap,
  isNumber,
  isObject,
  isPromise,
  isRegExp,
  isSet,
  isString,
  isTaggedBy,
  isTypeOf,
  isValue,
  isWeakMap,
  isWeakSet
} from '../utils/checkers'
import { kDateTag, kErrorTag } from '../utils/tags'
import type { TypeOf, Types, Value } from '../utils/types'
import { vahvista } from '../vahvista'

export const is = {
  isUndefined: vahvista.register('undefined', value => value === undefined),
  isNull: vahvista.register('null', value => value === null),
  isNil: vahvista.register('nil', value => value == null),
  isValue: vahvista.register('value', isValue),
  isBoolean: vahvista.register('boolean', isBoolean),
  isNumber: vahvista.register('number', isNumber),
  isNaN: vahvista.register('nan', value => Number.isNaN(value)),
  isSymbol: vahvista.register('symbol', isTypeOf('symbol')),
  isArrayLike: vahvista.register('arrayLike', isArrayLike),
  isArray: vahvista.register('array', value => Array.isArray(value)),
  isString: vahvista.register('string', isString),
  isArrayBuffer: vahvista.register('arrayBuffer', isArrayBuffer),
  isBuffer: vahvista.register('buffer', isBuffer),
  isDataView: vahvista.register('dataView', isInstanceOf(DataView)),
  isTypedArray: vahvista.register('typedArray', isTypedArray),
  isUint32Array: vahvista.register('uint32Array', isInstanceOf(Uint32Array)),
  isUint16Array: vahvista.register('uint16Array', isInstanceOf(Uint16Array)),
  isUint8Array: vahvista.register('uint8Array', isInstanceOf(Uint8Array)),
  isInt32Array: vahvista.register('int32Array', isInstanceOf(Int32Array)),
  isInt16Array: vahvista.register('int16Array', isInstanceOf(Int16Array)),
  isInt8Array: vahvista.register('int8Array', isInstanceOf(Int8Array)),
  isFloat64Array: vahvista.register('float64Array', isInstanceOf(Float64Array)),
  isFloat32Array: vahvista.register('float32Array', isInstanceOf(Float32Array)),
  isUint8ClampedArray: vahvista.register('uint8ClampedArray', isInstanceOf(Uint8ClampedArray)),
  isFunction: vahvista.register('function', isTypeOf('function')),
  isRegExp: vahvista.register('regExp', isRegExp),
  isObject: vahvista.register('object', isObject),
  isError: vahvista.register('error', isTaggedBy(kErrorTag)),
  isDate: vahvista.register('date', isTaggedBy(kDateTag)),
  isIterable: vahvista.register('iterable', isIterable),
  isIterator: vahvista.register('iterator', isIterator),
  isPromise: vahvista.register('promise', isPromise),
  isSet: vahvista.register('set', isSet),
  isWeakSet: vahvista.register('weakSet', isWeakSet),
  isMap: vahvista.register('map', isMap),
  isWeakMap: vahvista.register('weakMap', isWeakMap),
  isEnum: vahvista.factory<number | string>('enum', (values: Array<number | string>) => value => values.includes(value)),
  isTypeOf: vahvista.factory('typeOf', (type: Types) => value => typeof value === type),
  isInstanceOf: vahvista.factory('instanceOf', (type: new (...args: any[]) => any) => isInstanceOf(type))
}

declare module '../vahvista' {
  interface Rules {
    undefined: Predicate<undefined>
    null: Predicate<null>
    nil: Predicate<undefined | null>
    value: Predicate<Value>
    boolean: Predicate<boolean>
    number: Predicate<number>
    nan: Predicate
    symbol: Predicate<symbol>
    arrayLike: Predicate<ArrayLike<unknown>>
    array: Predicate<readonly unknown[]>
    string: Predicate<string>
    arrayBuffer: Predicate<ArrayBuffer>
    buffer: Predicate<Buffer>
    dataView: Predicate<DataView>
    typedArray: Predicate<TypedArray>
    uint32Array: Predicate<Uint32Array>
    uint16Array: Predicate<Uint16Array>
    uint8Array: Predicate<Uint8Array>
    int32Array: Predicate<Int32Array>
    int16Array: Predicate<Int16Array>
    int8Array: Predicate<Int8Array>
    float64Array: Predicate<Float64Array>
    float32Array: Predicate<Float32Array>
    uint8ClampedArray: Predicate<Uint8ClampedArray>
    function: Predicate<(...args: any[]) => any>
    regExp: Predicate<RegExp>
    object: Predicate<object>
    error: Predicate<Error>
    date: Predicate<Date>
    iterable: Predicate<Iterable<any>>
    iterator: Predicate<Iterator<any, any, any>>
    promise: Predicate<Promise<any>>
    set: Predicate<Set<any>>
    weakSet: Predicate<WeakSet<any>>
    map: Predicate<Map<any, any>>
    weakMap: Predicate<WeakMap<any, any>>
    enum: <E extends number | string>(values: readonly E[]) => Predicate<E>
    typeOf: <T extends Types>(type: T) => Predicate<TypeOf<T>>
    instanceOf: <C extends new (...args: any[]) => any>(type: C) => Predicate<InstanceType<C>>
  }
}
