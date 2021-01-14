import { every, isArray, isObject } from "lodash";
import { isPredicate } from "../utils/checkers";
import type { ArrayShape, ObjectShape, Shape, TypeBasedOnShape } from "../utils/types";
import { validation } from "../validation";

function isObjectValue(value: unknown): value is { [key: string]: unknown } {
    return isObject(value);
}

function isObjectShape(shape: Shape): shape is ObjectShape {
    return isObject(shape);
}

function isArrayShape(shape: Shape): shape is ArrayShape {
    return Array.isArray(shape);
}

function pathJoin(part: string, separator: string, current?: string): string {
    return current ? `${current}${separator}${part}` : part;
}

function shapeImpl<S extends Shape>(shape: S, value: unknown, path?: string): boolean {
    if (isPredicate(shape)) {
        return shape(value);
    }

    if (isArrayShape(shape)) {
        if (!isArray(value)) {
            return false;
        }

        return every(value, (entry, index) => shapeImpl(shape[0], entry, pathJoin(`[${index}]`, "", path)));
    }

    if (isObjectShape(shape)) {
        if (!isObjectValue(value)) {
            return false;
        }

        for (const [ key, data ] of Object.entries(shape)) {
            if (!shapeImpl(data, value[key], pathJoin(key, ".", path))) {
                return false;
            }
        }

        return true;
    }

    throw new TypeError(path ?
        `Shape has invalid property at ${path}, expected a predicate, array, or object` :
        "Shape input not a valid value, expected a predicate, array, or object");
}

export const object = {
    isShape: validation.factory("shape", <S extends Shape>(shape: S) => (value): value is TypeBasedOnShape<S> => shapeImpl(shape, value)),
};

declare module "../validation" {
    interface Rules {
        shape<S extends Shape>(shape: S): Predicate<TypeBasedOnShape<S>>;
    }
}
