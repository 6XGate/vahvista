import { vahvista } from "../vahvista";

// noinspection PointlessBooleanExpressionJS
export const boolean = {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    isTrue:   vahvista.register<boolean>("true", value => value === true),
    isTruthy: vahvista.register<boolean>("truthy", value => Boolean(value)),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    isFalse:  vahvista.register<boolean>("false", value => value === false),
    isFalsy:  vahvista.register<boolean>("falsy", value => !value),
};

declare module "../vahvista" {
    interface Rules<T> {
        true: Predicate<boolean>;
        truthy: Predicate<T>;
        false: Predicate<boolean>;
        falsy: Predicate<T>;
    }
}
