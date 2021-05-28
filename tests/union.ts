import test from 'ava'
import vahvista from '../src'
import { passManyFailMany } from './utils/macros'

const union = vahvista.or(vahvista.string, vahvista.integer, vahvista.shape([vahvista.string]).maxLength(2))

test('union', passManyFailMany(union),
  [
    'hey',
    12,
    ['hey', 'there']
  ],
  [
    new Error(),
    [2, 3],
    1.2
  ]
)
