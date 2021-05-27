import { isInstanceOf } from '../utils/checkers'
import { vahvista } from '../vahvista'

export const error = {
  isEvalError: vahvista.register('evalError', isInstanceOf(EvalError)),
  isRangeError: vahvista.register('rangeError', isInstanceOf(RangeError)),
  isReferenceError: vahvista.register('referenceError', isInstanceOf(ReferenceError)),
  isSyntaxError: vahvista.register('syntaxError', isInstanceOf(SyntaxError)),
  isTypeError: vahvista.register('typeError', isInstanceOf(TypeError)),
  isUriError: vahvista.register('uriError', isInstanceOf(URIError))
}

declare module '../vahvista' {
  interface Rules {
    evalError: Predicate<EvalError>
    rangeError: Predicate<RangeError>
    referenceError: Predicate<ReferenceError>
    syntaxError: Predicate<SyntaxError>
    typeError: Predicate<TypeError>
    uriError: Predicate<URIError>
  }
}
