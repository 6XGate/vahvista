/* eslint-disable @typescript-eslint/ban-types */
import { isEmpty, negate, size } from "lodash";
import { validation } from "../validation";

export const collection = {
    isEmpty:    validation.register("empty", isEmpty),
    isNotEmpty: validation.register("notEmpty", negate(isEmpty)),
    isSize:     validation.factory<string|object>("size", (len: number) => value => size(value) === len),
    maxSize:    validation.factory<string|object>("maxSize", (len: number) => value => size(value) <= len),
    minSize:    validation.factory<string|object>("minSize", (len: number) => value => size(value) >= len),
};

declare module "../validation" {
    interface Rules<T> {
        empty: Predicate<T>;
        notEmpty: Predicate<T>;
        size(length: number): Predicate<T>;
        maxSize(length: number): Predicate<T>;
        minSize(length: number): Predicate<T>;
    }
}
