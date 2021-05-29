/* eslint-disable @typescript-eslint/ban-types */
import { getSize, isEmpty } from '../utils/checkers'
import { vahvista } from '../vahvista'

export const collection = {
  isEmpty: vahvista.register('empty', isEmpty),
  isNotEmpty: vahvista.register('notEmpty', value => !isEmpty(value)),
  isSize: vahvista.factory<string|object>('size', (len: number) => value => getSize(value) === len),
  maxSize: vahvista.factory<string|object>('maxSize', (len: number) => value => getSize(value) <= len),
  minSize: vahvista.factory<string|object>('minSize', (len: number) => value => getSize(value) >= len)
}

declare module '../vahvista' {
  interface Rules<T> {
    empty: Predicate<T>
    notEmpty: Predicate<T>
    size: (length: number) => Predicate<T>
    maxSize: (length: number) => Predicate<T>
    minSize: (length: number) => Predicate<T>
  }
}
