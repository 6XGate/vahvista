import type { Predicate } from "../vahvista";
import { vahvista } from "../vahvista";

export const tuple = {
    isTuple: vahvista.factory("tuple", (...predicates: Predicate[]) => (value): boolean => {
        if (!Array.isArray(value)) {
            return false;
        }

        if (value.length !== predicates.length) {
            return false;
        }

        for (let i = 0; i !== predicates.length; ++i) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if (!predicates[i]!(value[i])) {
                return false;
            }
        }

        return true;
    }),
};

type TuplePredicateTarget<P extends Predicate[]> =
    P extends [Predicate<infer T0>] ? Predicate<[T0]> :
    P extends [Predicate<infer T0>, Predicate<infer T1>] ? Predicate<[T0, T1]> :
    P extends [Predicate<infer T0>, Predicate<infer T1>, Predicate<infer T2>] ? Predicate<[T0, T1, T2]> :
    P extends [Predicate<infer T0>, Predicate<infer T1>, Predicate<infer T2>, Predicate<infer T3>] ? Predicate<[T0, T1, T2, T3]> :
    P extends [Predicate<infer T0>, Predicate<infer T1>, Predicate<infer T2>, Predicate<infer T3>, Predicate<infer T4>] ? Predicate<[T0, T1, T2, T3, T4]> :
    P extends [Predicate<infer T0>, Predicate<infer T1>, Predicate<infer T2>, Predicate<infer T3>, Predicate<infer T4>, Predicate<infer T5>] ? Predicate<[T0, T1, T2, T3, T4, T5]> :
    P extends [Predicate<infer T0>, Predicate<infer T1>, Predicate<infer T2>, Predicate<infer T3>, Predicate<infer T4>, Predicate<infer T5>, Predicate<infer T6>] ? Predicate<[T0, T1, T2, T3, T4, T5, T6]> :
    P extends [Predicate<infer T0>, Predicate<infer T1>, Predicate<infer T2>, Predicate<infer T3>, Predicate<infer T4>, Predicate<infer T5>, Predicate<infer T6>, Predicate<infer T7>] ? Predicate<[T0, T1, T2, T3, T4, T5, T6, T7]> :
    P extends [Predicate<infer T0>, Predicate<infer T1>, Predicate<infer T2>, Predicate<infer T3>, Predicate<infer T4>, Predicate<infer T5>, Predicate<infer T6>, Predicate<infer T7>, Predicate<infer T8>] ? Predicate<[T0, T1, T2, T3, T4, T5, T6, T7, T8]> :
    P extends [Predicate<infer T0>, Predicate<infer T1>, Predicate<infer T2>, Predicate<infer T3>, Predicate<infer T4>, Predicate<infer T5>, Predicate<infer T6>, Predicate<infer T7>, Predicate<infer T8>, Predicate<infer T9>] ? Predicate<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9]> :
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Predicate<any[]>; // Too many, any typing.

declare module "../vahvista" {
    interface Rules {
        tuple<P extends Predicate[]>(...predicates: P): TuplePredicateTarget<P>;
    }
}
