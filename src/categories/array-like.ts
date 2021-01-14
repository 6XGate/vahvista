import { vahvista } from "../vahvista";

export const arrayLike = {
    isLength:  vahvista.factory<ArrayLike<unknown>>("length", (len: number) => value => value.length === len),
    maxLength: vahvista.factory<ArrayLike<unknown>>("maxLength", (len: number) => value => value.length <= len),
    minLength: vahvista.factory<ArrayLike<unknown>>("minLength", (len: number) => value => value.length >= len),
};

declare module "../vahvista" {
    interface Rules<T> {
        length(length: number): Predicate<T>;
        maxLength(length: number): Predicate<T>;
        minLength(length: number): Predicate<T>;
    }
}
