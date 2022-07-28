/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Mutable, PredicateInterface } from './utils/types'

export type Validator<T = any> = (value: T) => boolean
export type ValidatorFactory<T = any> = (...args: any[]) => (value: T) => boolean

type UnionPredicate<P extends Predicate[]> = Predicate<PredicateType<P[number]>>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Rules<T = any> {
  // Defined to be extended with registered rules, empty by default.
  or: <P extends Predicate[]>(...args: P) => UnionPredicate<P>
}

export interface Predicate<T = any> extends Rules<T>, PredicateInterface<T> {
  (value: unknown): value is T
}

type PredicateFactory<T = any> = (...args: unknown[]) => Predicate<T>

export class Vahvista {
  register<T = unknown>(name: keyof Rules, validator: Validator<T>): Predicate<T> {
    Object.defineProperty(Predicate.prototype, name, {
      configurable: false,
      enumerable: false,

      // Getter for chaining.
      get: function (this: Predicate): Predicate<T> {
        return Predicate.make<T>(this.core, [...this.chain, validator])
      }
    })

    const predicate = Predicate.make<T>(this, [validator])

    Object.defineProperty(Vahvista.prototype, name, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: predicate
    })

    return predicate
  }

  factory<T = unknown>(name: keyof Rules, factory: ValidatorFactory<T>): PredicateFactory<T> {
    Object.defineProperty(Predicate.prototype, name, {
      configurable: false,
      enumerable: false,
      writable: false,

      // Chaining wrapper.
      value: function (this: Predicate, ...args: unknown[]): Predicate<T> {
        return Predicate.make<T>(this.core, [...this.chain, factory(...args)])
      }
    })

    const predicateFactory = (...args: unknown[]): Predicate<T> => Predicate.make<T>(this, [factory(...args)])

    Object.defineProperty(Vahvista.prototype, name, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: predicateFactory
    })

    return predicateFactory
  }
}

export interface Vahvista extends Rules {
  // Defined to ensure extensibility, empty because the class does the rest.
}

function invokePredicate (this: Predicate, value: any): boolean {
  for (const validator of this.chain) {
    if (!validator(value)) {
      return false
    }
  }

  return true
}

type PredicateBreakers = 'arguments' | 'caller' | 'length' | 'name'

// eslint-disable-next-line @typescript-eslint/ban-types
function cleanFunction<T extends Function> (func: Mutable<Partial<T>>): Omit<Mutable<Partial<T>>, PredicateBreakers> {
  delete func.arguments
  delete func.caller
  delete func.length
  delete func.name

  return func
}

export class Predicate<T = any> {
  readonly ['@isPredicate'] = true
  core: Vahvista
  chain: Array<Validator<T>>

  static make<O>(core: Vahvista, chain: Array<Validator<O>>): Predicate<O> {
    const inner = new Predicate<O>(core, chain)
    const bound = invokePredicate.bind(inner) as Mutable<Partial<typeof invokePredicate>>
    let predicate = Object.assign(cleanFunction(bound), inner)
    predicate = Object.setPrototypeOf(predicate, Predicate.prototype) as Predicate<O>

    return predicate
  }

  private constructor (core: Vahvista, chain: Array<Validator<T>>) {
    this.core = core
    this.chain = chain
  }
}

export const vahvista = new Vahvista()

vahvista.factory('or', (...possibilities: Predicate[]) => value => {
  for (const possibility of possibilities) {
    if (possibility(value)) {
      return true
    }
  }

  return false
})

export type PredicateType<P> = P extends Predicate<infer T> ? T : never
