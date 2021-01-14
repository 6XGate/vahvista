/* eslint-disable @typescript-eslint/no-explicit-any */
import { every, some } from "lodash";
import { hasBase } from "../utils/checkers";
import type { KeyType } from "../utils/types";
import { vahvista } from "../vahvista";

export const keyed = {
    has:    vahvista.factory("has", (...keys: readonly any[]) => value => every(keys, key => hasBase(value, key))),
    hasAny: vahvista.factory("hasAny", (...keys: readonly any[]) => value => some(keys, key => hasBase(value, key))),
};

declare module "../vahvista" {
    interface Rules<T> {
        has(...keys: readonly KeyType<T>[]): Predicate<T>;
        hasAny(...keys: readonly KeyType<T>[]): Predicate<T>;
    }
}
