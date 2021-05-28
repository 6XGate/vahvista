import { inRange, isInfinite } from '../utils/checkers'
import { vahvista } from '../vahvista'

export const number = {
  isNegative: vahvista.register<number>(
    'negative',
    value => value < 0
  ),
  isPositive: vahvista.register<number>(
    'positive',
    value => value > 0
  ),
  isFinite: vahvista.register<number>(
    'finite',
    Number.isFinite
  ),
  isInfinite: vahvista.register<number>(
    'infinite',
    value => isInfinite(value)
  ),
  isUint32: vahvista.register<number>(
    'uint32',
    value => Number.isInteger(value) && inRange(value, 0, 4294967295)
  ),
  isUint16: vahvista.register<number>(
    'uint16',
    value => Number.isInteger(value) && inRange(value, 0, 65535)
  ),
  isUint8: vahvista.register<number>(
    'uint8',
    value => Number.isInteger(value) && inRange(value, 0, 255)
  ),
  isInt32: vahvista.register<number>(
    'int32',
    value => Number.isInteger(value) && inRange(value, -2147483648, 2147483647)
  ),
  isInt16: vahvista.register<number>(
    'int16',
    value => Number.isInteger(value) && inRange(value, -32768, 32767)
  ),
  isInt8: vahvista.register<number>(
    'int8',
    value => Number.isInteger(value) && inRange(value, -128, 127)
  ),
  isInteger: vahvista.register<number>(
    'integer',
    Number.isInteger
  ),
  isIntegerOrInfinite: vahvista.register<number>(
    'integerOrInfinite',
    value => Number.isInteger(value) || isInfinite(value)
  ),
  inRange: vahvista.factory<number>(
    'inRange',
    (min: number, max: number) => value => inRange(value, min, max)
  )
}

declare module '../vahvista' {
  interface Rules {
    negative: Predicate<number>
    positive: Predicate<number>
    finite: Predicate<number>
    infinite: Predicate<number>
    uint32: Predicate<number>
    uint16: Predicate<number>
    uint8: Predicate<number>
    int32: Predicate<number>
    int16: Predicate<number>
    int8: Predicate<number>
    integer: Predicate<number>
    integerOrInfinite: Predicate<number>
    inRange: (min: number, max: number) => Predicate<number>
  }
}
