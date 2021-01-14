import { every, some } from "lodash";
import { validation } from "../validation";

export const array = {
    includes: validation.factory<readonly unknown[]>(
        "includes",
        (...items: readonly unknown[]) => value => every(items, item => value.includes(item)),
    ),
    includesAny: validation.factory<readonly unknown[]>(
        "includesAny",
        (...items: readonly unknown[]) => value => some(items, item => value.includes(item)),
    ),
};

declare module "../validation" {
    interface Rules {
        includes<T>(...items: readonly T[]): Predicate<readonly T[]>;
        includesAny<T>(...items: readonly T[]): Predicate<readonly T[]>;
    }
}
