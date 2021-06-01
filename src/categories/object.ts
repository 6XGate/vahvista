import { isObject, isPredicate } from '../utils/checkers'
import type { ArrayShape, ObjectShape, Shape, TypeBasedOnShape } from '../utils/types'
import type { Predicate } from '../vahvista'
import { vahvista } from '../vahvista'

function isObjectValue (value: unknown): value is { [key: string]: unknown } {
  // TODO: More validation
  return isObject(value)
}

function isObjectShape (shape: Shape): shape is ObjectShape {
  // TODO: More validation
  return isObject(shape)
}

function isArrayShape (shape: Shape): shape is ArrayShape {
  return Array.isArray(shape)
}

function pathJoin (part: string, separator: string, current?: string): string {
  return current != null && current.length > 0 ? `${current}${separator}${part}` : part
}

function shapeImpl<S extends Shape> (shape: S, value: unknown, path?: string): boolean {
  if (isPredicate(shape)) {
    return shape(value)
  }

  if (isArrayShape(shape)) {
    if (!Array.isArray(value)) {
      return false
    }

    return value.every((entry, index) => shapeImpl(shape[0], entry, pathJoin(`[${index}]`, '', path)))
  }

  if (isObjectShape(shape)) {
    if (!isObjectValue(value)) {
      return false
    }

    for (const [key, data] of Object.entries(shape)) {
      if (!shapeImpl(data, value[key], pathJoin(key, '.', path))) {
        return false
      }
    }

    return true
  }

  throw new TypeError(path != null && path.length > 0
    ? `Shape has invalid property at ${path}, expected a predicate, array, or object`
    : 'Shape input not a valid value, expected a predicate, array, or object')
}

export const object = {
  isShape: vahvista.factory('shape', <S extends Shape>(shape: S) =>
    (value): value is TypeBasedOnShape<S> => shapeImpl(shape, value)),
  isDict: vahvista.factory('dict', (predicate: Predicate) =>
    (value: unknown) => isObject(value) && Object.entries(value).every(([,prop]) => predicate(prop)))
}

declare module '../vahvista' {
  interface Rules {
    shape: <S extends Shape>(shape: S) => Predicate<TypeBasedOnShape<S>>
    dict: <T>(predicate: Predicate) => Predicate<{ [key: string]: T }>
  }
}
