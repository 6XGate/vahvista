import { validation } from "../validation";

// noinspection PointlessBooleanExpressionJS
export const boolean = {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    isTrue:   validation.register<boolean>("true", value => value === true),
    isTruthy: validation.register<boolean>("truthy", value => Boolean(value)),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    isFalse:  validation.register<boolean>("false", value => value === false),
    isFalsy:  validation.register<boolean>("falsy", value => !value),
};

declare module "../validation" {
    interface Rules<T> {
        true: Predicate<boolean>;
        truthy: Predicate<T>;
        false: Predicate<boolean>;
        falsy: Predicate<T>;
    }
}
