import { validation } from "../validation";

export const arrayLike = {
    isLength:  validation.factory<ArrayLike<unknown>>("length", (len: number) => value => value.length === len),
    maxLength: validation.factory<ArrayLike<unknown>>("maxLength", (len: number) => value => value.length <= len),
    minLength: validation.factory<ArrayLike<unknown>>("minLength", (len: number) => value => value.length >= len),
};

declare module "../validation" {
    interface Rules<T> {
        length(length: number): Predicate<T>;
        maxLength(length: number): Predicate<T>;
        minLength(length: number): Predicate<T>;
    }
}
