import test from 'ava'
import vahvista from '../src'
import { passOneFailMany } from './utils/macros'

test('is eval error', passOneFailMany(vahvista.evalError), new EvalError(),
  [new Error(), new ReferenceError()]
)

test('is range error', passOneFailMany(vahvista.rangeError), new RangeError(),
  [new Error(), new ReferenceError()]
)

test('is reference error', passOneFailMany(vahvista.referenceError), new ReferenceError(),
  [new Error(), new URIError()]
)

test('is syntax error', passOneFailMany(vahvista.syntaxError), new SyntaxError(),
  [new Error(), new ReferenceError()]
)

test('is type error', passOneFailMany(vahvista.typeError), new TypeError(),
  [new Error(), new ReferenceError()]
)

test('is uri error', passOneFailMany(vahvista.uriError), new URIError(),
  [new Error(), new ReferenceError()]
)
