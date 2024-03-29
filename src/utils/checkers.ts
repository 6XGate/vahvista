/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TagOf, TypeTags } from './tags'
import {
  getTag, kArrayBufferTag,
  kBooleanTag,
  kMapTag,
  kNumberTag,
  kRegExpTag,
  kSetTag,
  kStringTag,
  kWeakMapTag,
  kWeakSetTag
} from './tags'
import type { MaybePredicateInterface, PredicateInterface, TypeOf, Types, Value } from './types'

export function ignore (..._data: unknown[]): void { return undefined }

type IsInstanceOfValidator<C> = (value: unknown) => value is C
export function isInstanceOf<C extends new (...args: any[]) => any> (type: C): IsInstanceOfValidator<InstanceType<C>> {
  return (value): value is InstanceType<C> => value instanceof type
}

type IsTypeOfValidator<T> = (value: unknown) => value is T
export function isTypeOf<T extends Types> (type: T): IsTypeOfValidator<TypeOf<T>> {
  return (value): value is TypeOf<T> => typeof value === type
}

type IsTaggedByValidator<T> = (value: unknown) => value is T
export function isTaggedBy<T extends TypeTags> (tag: T): IsTaggedByValidator<TagOf<T>> {
  return (value): value is TagOf<T> => getTag(value) === tag
}

export const isBoolean = isTaggedBy(kBooleanTag)
export const isNumber = isTaggedBy(kNumberTag)
export const isString = isTaggedBy(kStringTag)
export const isFunction = isTypeOf('function')
export const isRegExp = isTaggedBy(kRegExpTag)
export const isMap = isTaggedBy(kMapTag)
export const isSet = isTaggedBy(kSetTag)
export const isWeakMap = isTaggedBy(kWeakMapTag)
export const isWeakSet = isTaggedBy(kWeakSetTag)
export const isArrayBuffer = isTaggedBy(kArrayBufferTag)

export function isObject (value: unknown): value is object {
  const type = typeof value

  return value != null && (type === 'object' || type === 'function')
}

// // eslint-disable-next-line @typescript-eslint/ban-types -- isObjectLike test, nuf said
// export function isObjectLike (value: unknown): value is object {
//   return value != null && typeof value === 'object'
// }

export function isLength (value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value) && value >= 0 && value <= Number.MAX_SAFE_INTEGER
}

export function isArrayLike (value: unknown): value is ArrayLike<unknown> {
  return value != null && !isFunction(value) && isLength((value as { length: unknown }).length)
}

export function isEmpty (value: unknown): boolean {
  if (value == null) {
    return true
  }

  if (isArrayLike(value)) {
    return value.length === 0
  }

  const tag = getTag(value)
  if (tag === kMapTag || tag === kSetTag) {
    return (value as { size: number }).size === 0
  }

  return Object.keys(value as object).length === 0
}

export function getSize (value: unknown): number {
  if (value == null) {
    return 0
  }

  if (isArrayLike(value)) {
    return value.length
  }

  const tag = getTag(value)
  if (tag === kMapTag || tag === kSetTag) {
    return (value as { size: number }).size
  }

  return Object.keys(value as object).length
}

export function isPredicate (value: unknown): value is PredicateInterface {
  return isObject(value) ? Boolean((value as MaybePredicateInterface)['@isPredicate']) : false
}

export function isValue (value: unknown): value is Value {
  return isBoolean(value) || isNumber(value) || (typeof value === 'bigint') || isString(value)
}

export function isInfinite (value: number): boolean {
  return value === Infinity || value === -Infinity
}

export function inRange (value: number, min: number, max: number): boolean {
  return Math.min(min, max) <= value && value <= Math.max(min, max)
}

export function isIterable (value: unknown): value is Iterable<unknown> {
  return value != null && isFunction((value as { [Symbol.iterator]: unknown })[Symbol.iterator])
}

export function isIterator (value: unknown): value is Iterator<unknown> {
  return value != null && isFunction((value as { next: unknown }).next)
}

export function isNativePromise (value: unknown): value is Promise<unknown> {
  return value instanceof Promise
}

export function isPromiseLike (value: unknown): value is PromiseLike<unknown> {
  // TODO: Test
  /* istanbul ignore next */
  return value != null && isFunction((value as { then: unknown }).then) &&
    isFunction((value as { catch: unknown }).catch)
}

export function isPromise (value: unknown): value is Promise<unknown> | PromiseLike<unknown> {
  return isNativePromise(value) || isPromiseLike(value)
}

export function hasKey (target: any, key: any): boolean {
  if (Array.isArray(target) && Number.isInteger(key)) {
    return key >= 0 && key < target.length
  }

  if (isWeakMap(target) || isWeakSet(target) || isMap(target) || isSet(target)) {
    return target.has(key as object)
  }

  if (isObject(target)) {
    return key in target
  }

  return false
}

export function eqOrRegExp (subject: string, test: string | RegExp): boolean {
  return isRegExp(test) ? test.test(subject) : subject === test
}
