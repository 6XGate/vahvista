import { isObject } from 'lodash'
import { eqOrRegExp } from '../utils/checkers'
import type { Namable } from '../utils/types'
import { vahvista } from '../vahvista'

export const namable = {
  name: vahvista.factory<Namable>(
    'name',
    (match: string|RegExp) => value => isObject(value) && 'name' in value && eqOrRegExp(value.name, match)
  )
}

declare module '../vahvista' {
  interface Rules<T> {
    name: (match: string|RegExp) => Predicate<T>
  }
}
