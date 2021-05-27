import test from 'ava'
import vahvista from '../src'
import { passManyFailMany } from './utils/macros'

test('is length', passManyFailMany(vahvista.length(1)),
  ['2', [2]],
  ['23', [2, 3]]
)

test('is max length', passManyFailMany(vahvista.maxLength(2)),
  ['23', [2, 3], '2', [2]],
  ['234', [2, 3, 4]]
)

test('is min length', passManyFailMany(vahvista.minLength(2)),
  ['23', [2, 3], '234', [2, 3, 4]],
  ['2', [2]]
)
