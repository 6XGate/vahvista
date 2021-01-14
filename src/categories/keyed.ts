/* eslint-disable @typescript-eslint/no-explicit-any */
import { every, some } from "lodash";
import { hasBase } from "../utils/checkers";
import type { KeyType } from "../utils/types";
import { validation } from "../validation";

export const keyed = {
    has:    validation.factory("has", (...keys: any[]) => value => every(keys, key => hasBase(value, key))),
    hasAny: validation.factory("hasAny", (...keys: any[]) => value => some(keys, key => hasBase(value, key))),
};

declare module "../validation" {
    interface Rules<T> {
        has(...keys: KeyType<T>[]): Predicate<T>;
        hasAny(...keys: KeyType<T>[]): Predicate<T>;
    }
}
