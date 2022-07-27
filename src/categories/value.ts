import type { PossibleLiteral, Value } from '../utils/types'
import { vahvista } from '../vahvista'

export const value = {
  isOneOf: vahvista.factory<Value>(
    'oneOf',
    (...values: readonly Value[]) => _value => values.includes(_value)
  ),
  isEqual: vahvista.factory<Value>(
    'equal',
    (target: Value) => _value => _value === target
  ),
  isNotEqual: vahvista.factory<Value>(
    'notEqual',
    (target: Value) => _value => _value !== target
  ),
  isGreaterThan: vahvista.factory<Value>(
    'greaterThan',
    (target: Value) => _value => _value > target
  ),
  isGreaterThanOrEqual: vahvista.factory<Value>(
    'greaterThanOrEqual',
    (target: Value) => _value => _value >= target
  ),
  isLessThan: vahvista.factory<Value>(
    'lessThan',
    (target: Value) => _value => _value < target
  ),
  isLessThanOrEqual: vahvista.factory<Value>(
    'lessThanOrEqual',
    (target: Value) => _value => _value <= target
  )
}

declare module '../vahvista' {
  interface Rules {
    oneOf: <T extends readonly PossibleLiteral[]>(...values: T) => Predicate<T[number]>
    equal: <T extends PossibleLiteral>(target: T) => Predicate<T>
    notEqual: <T>(target: T) => Predicate<T>
    greaterThan: <T>(target: T) => Predicate<T>
    greaterThanOrEqual: <T>(target: T) => Predicate<T>
    lessThan: <T>(target: T) => Predicate<T>
    lessThanOrEqual: <T>(target: T) => Predicate<T>
  }
}
