import { ignore } from "../utils/checkers";
import { validation } from "../validation";

export const string = {
    isAlphabetic:   validation.register<string>("alphabetic", value => (/^[A-Za-z]+$/u).test(value)),
    isAlphaNumeric: validation.register<string>("alphaNumeric", value => (/^[A-Za-z\d]+$/u).test(value)),
    isDateLike:     validation.register<string>("dateLike", value => !isNaN(Date.parse(value))),
    isNumeric:      validation.register<string>("numeric", value => (/^[+-]?\d+(?:\.\d+)?$/u).test(value)),
    isIntegral:     validation.register<string>("integral", value => (/^[+-]?\d+$/u).test(value)),
    isLowerCase:    validation.register<string>("lowerCase", value => value === value.toLowerCase()),
    isUpperCase:    validation.register<string>("upperCase", value => value === value.toUpperCase()),
    isUrl:          validation.register<string>("url", value => {
        try {
            ignore(new URL(value));

            return true;
        } catch {
            return false;
        }
    }),
    contains:   validation.factory<string>("contains", (target: string) => value => value.includes(target)),
    endsWith:   validation.factory<string>("endsWith", (target: string) => value => value.endsWith(target)),
    startsWith: validation.factory<string>("startsWith", (target: string) => value => value.startsWith(target)),
    matches:    validation.factory<string>("matches", (regex: RegExp) => value => regex.test(value)),
};

declare module "../validation" {
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
