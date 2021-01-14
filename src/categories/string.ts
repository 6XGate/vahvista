import { toString } from "lodash";
import { ignore } from "../utils/checkers";
import { vahvista } from "../vahvista";

export const string = {
    isAlphabetic:   vahvista.register<string>("alphabetic", value => (/^[A-Za-z]+$/u).test(value)),
    isAlphaNumeric: vahvista.register<string>("alphaNumeric", value => (/^[A-Za-z\d]+$/u).test(value)),
    isDateLike:     vahvista.register<string>("dateLike", value => !isNaN(Date.parse(value))),
    isNumeric:      vahvista.register<string>("numeric", value => (/^[+-]?\d+(?:\.\d+)?$/u).test(value)),
    isIntegral:     vahvista.register<string>("integral", value => (/^[+-]?\d+$/u).test(value)),
    isLowerCase:    vahvista.register<string>("lowerCase", value => value === toString(value).toLowerCase()),
    isUpperCase:    vahvista.register<string>("upperCase", value => value === toString(value).toUpperCase()),
    isUrl:          vahvista.register<string>("url", value => {
        try {
            ignore(new URL(value));

            return true;
        } catch {
            return false;
        }
    }),
    contains:   vahvista.factory<string>("contains", (target: string) => value => toString(value).includes(target)),
    endsWith:   vahvista.factory<string>("endsWith", (target: string) => value => toString(value).endsWith(target)),
    startsWith: vahvista.factory<string>("startsWith", (target: string) => value => toString(value).startsWith(target)),
    matches:    vahvista.factory<string>("matches", (regex: RegExp) => value => regex.test(value)),
};

declare module "../vahvista" {
    interface Rules {
        alphabetic: Predicate<string>;
        alphaNumeric: Predicate<string>;
        dateLike: Predicate<string>;
        numeric: Predicate<string>;
        integral: Predicate<string>;
        lowerCase: Predicate<string>;
        upperCase: Predicate<string>;
        url: Predicate<string>;
        contains(target: string): Predicate<string>;
        endsWith(target: string): Predicate<string>;
        startsWith(target: string): Predicate<string>;
        matches(regex: RegExp): Predicate<string>;
    }
}
