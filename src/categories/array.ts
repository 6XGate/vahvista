import { vahvista } from '../vahvista'

export const array = {
  includes: vahvista.factory<readonly unknown[]>(
    'includes',
    (...items: readonly unknown[]) => value => items.every(item => value.includes(item))
  ),
  includesAny: vahvista.factory<readonly unknown[]>(
    'includesAny',
    (...items: readonly unknown[]) => value => items.some(item => value.includes(item))
  )
}

declare module '../vahvista' {
  interface Rules {
    includes: <T>(...items: readonly T[]) => Predicate<readonly T[]>
    includesAny: <T>(...items: readonly T[]) => Predicate<readonly T[]>
  }
}
