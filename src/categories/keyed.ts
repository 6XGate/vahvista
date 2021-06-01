/* eslint-disable @typescript-eslint/no-explicit-any */
import { hasKey } from '../utils/checkers'
import type { KeyType } from '../utils/types'
import { vahvista } from '../vahvista'

export const keyed = {
  has: vahvista.factory('has', (...keys: readonly any[]) => value => keys.every(key => hasKey(value, key))),
  hasAny: vahvista.factory('hasAny', (...keys: readonly any[]) => value => keys.some(key => hasKey(value, key)))
}

declare module '../vahvista' {
  interface Rules<T> {
    has: (...keys: ReadonlyArray<KeyType<T>>) => Predicate<T>
    hasAny: (...keys: ReadonlyArray<KeyType<T>>) => Predicate<T>
  }
}
