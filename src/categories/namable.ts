import { isObject } from "lodash";
import type { Namable } from "../utils/types";
import { validation } from "../validation";

export const namable = {
    name: validation.factory<Namable>(
        "name",
        (name: string) => value => isObject(value) && "name" in value && value.name === name,
    ),
};

declare module "../validation" {
    interface Rules<T> {
        name(name: string): Predicate<T>;
    }
}
