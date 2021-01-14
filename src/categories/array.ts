import { every, some } from "lodash";
import { vahvista } from "../vahvista";

export const array = {
    includes: vahvista.factory<readonly unknown[]>(
        "includes",
        (...items: readonly unknown[]) => value => every(items, item => value.includes(item)),
    ),
    includesAny: vahvista.factory<readonly unknown[]>(
        "includesAny",
        (...items: readonly unknown[]) => value => some(items, item => value.includes(item)),
    ),
};

declare module "../vahvista" {
    interface Rules {
        includes<T>(...items: readonly T[]): Predicate<readonly T[]>;
        includesAny<T>(...items: readonly T[]): Predicate<readonly T[]>;
    }
}
