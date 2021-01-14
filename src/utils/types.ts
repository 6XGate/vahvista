/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any */
/* istanbul ignore next */
const temp = typeof undefined;
export type Types = typeof temp;
export type Value = boolean|number|bigint|string;
export type Namable = { name: string };

export interface MaybePredicateInterface {
    readonly ["@isPredicate"]?: boolean;
}

export interface PredicateInterface<T = any> extends MaybePredicateInterface {
    readonly ["@isPredicate"]: true;
    (value: unknown): value is T;
}

export type TypeOf<T extends Types> =
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    T extends "undefined" ? void :
    T extends "boolean" ? boolean :
    T extends "number" ? number :
    T extends "bigint" ? bigint :
    T extends "string" ? string :
    T extends "symbol" ? symbol :
    T extends "function" ? (...args: any[]) => any :
    T extends "object" ? null|object :
    never;

export type KeyType<T> =
    T extends WeakMap<infer K, any> ? K :
    T extends Map<infer K, any> ? K :
    T extends WeakSet<infer V> ? V :
    T extends Set<infer V> ? V :
    T extends object ? number|string|object :
    never;

export type ElementType<T> =
    T extends readonly unknown[] ? T[number] :
    never;

export type ObjectShape = {
    [key: string]: PredicateInterface|Shape;
};

export type ArrayShape = readonly [PredicateInterface|Shape]|readonly (PredicateInterface|Shape)[];

export type Shape = ObjectShape|ArrayShape|PredicateInterface;

export type TypeBasedOnShape<S extends Shape> =
    S extends PredicateInterface<infer T> ? T :
    S extends ArrayShape ? TypeBasedOnShape<S[number]>[] :
    S extends ObjectShape ? { [K in keyof S]: TypeBasedOnShape<S[K]> } :
    never;
