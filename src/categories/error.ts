import { isInstanceOf } from "../utils/checkers";
import { validation } from "../validation";

export const error = {
    isEvalError:      validation.register("evalError", isInstanceOf(EvalError)),
    isRangeError:     validation.register("rangeError", isInstanceOf(RangeError)),
    isReferenceError: validation.register("referenceError", isInstanceOf(ReferenceError)),
    isSyntaxError:    validation.register("syntaxError", isInstanceOf(SyntaxError)),
    isTypeError:      validation.register("typeError", isInstanceOf(TypeError)),
    isUriError:       validation.register("uriError", isInstanceOf(URIError)),
};

declare module "../validation" {
    interface Rules {
        evalError: Predicate<EvalError>;
        rangeError: Predicate<RangeError>;
        referenceError: Predicate<ReferenceError>;
        syntaxError: Predicate<SyntaxError>;
        typeError: Predicate<TypeError>;
        uriError: Predicate<URIError>;
    }
}
