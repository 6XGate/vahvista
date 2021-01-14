/* eslint-disable @typescript-eslint/ban-types */
import { isEmpty, negate, size } from "lodash";
import { vahvista } from "../vahvista";

export const collection = {
    isEmpty:    vahvista.register("empty", isEmpty),
    isNotEmpty: vahvista.register("notEmpty", negate(isEmpty)),
    isSize:     vahvista.factory<string|object>("size", (len: number) => value => size(value) === len),
    maxSize:    vahvista.factory<string|object>("maxSize", (len: number) => value => size(value) <= len),
    minSize:    vahvista.factory<string|object>("minSize", (len: number) => value => size(value) >= len),
};

declare module "../vahvista" {
    interface Rules<T> {
        empty: Predicate<T>;
        notEmpty: Predicate<T>;
        size(length: number): Predicate<T>;
        maxSize(length: number): Predicate<T>;
        minSize(length: number): Predicate<T>;
    }
}
