import test from 'ava'
import vahvista from '../src'
import { passOneFailOne } from './utils/macros'

test('includes', passOneFailOne(vahvista.includes(2, 3, 4)),
  [1, 2, 3, 4, 5, 6],
  [1, 2, 4, 5, 6, 7]
)

test('includesAny', passOneFailOne(vahvista.includesAny(2, 3, 4)),
  [1, 2, 4, 5, 6],
  [1, 5, 6, 7, 8]
)
