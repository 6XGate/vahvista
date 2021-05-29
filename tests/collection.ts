import test from 'ava'
import vahvista from '../src'
import { passManyFailMany } from './utils/macros'

test('is empty', passManyFailMany(vahvista.empty),
  ['', [], {}, new Set(), new Map(), null],
  ['2', [2], { a: 2 }, new Set([2]), new Map([[1, 2]])]
)

test('is not empty', passManyFailMany(vahvista.notEmpty),
  ['2', [2], { a: 2 }, new Set([2]), new Map([[1, 2]])],
  ['', [], {}, new Set(), new Map()]
)

test('is size, one', passManyFailMany(vahvista.size(1)),
  ['2', [2], { a: 2 }, new Set([2]), new Map([[1, 2]])],
  ['23', [2, 3], { a: 2, b: 3 }, new Set([2, 3]), new Map([[1, 2], [2, 3]]), null]
)

test('is size, zero', passManyFailMany(vahvista.size(0)),
  ['', [], {}, new Set(), new Map(), null],
  ['2', [2], { a: 2 }, new Set([2]), new Map([[1, 2]])]
)

test('is max size', passManyFailMany(vahvista.maxSize(2)),
  [
    '23',
    [2, 3],
    { a: 2, b: 3 },
    new Set([2, 3]),
    new Map([[1, 2], [2, 3]]),
    '2',
    [2],
    { a: 2 },
    new Set([2]),
    new Map([[1, 2]])
  ],
  [
    '234',
    [2, 3, 4],
    { a: 2, b: 3, c: 4 },
    new Set([2, 3, 4]),
    new Map([[1, 2], [2, 3], [3, 4]])
  ]
)

test('is min size', passManyFailMany(vahvista.minSize(2)),
  [
    '23',
    [2, 3],
    { a: 2, b: 3 },
    new Set([2, 3]),
    new Map([[1, 2], [2, 3]]),
    '234',
    [2, 3, 4],
    { a: 2, b: 3, c: 4 },
    new Set([2, 3, 4]),
    new Map([[1, 2], [2, 3], [3, 4]])
  ],
  [
    '2',
    [2],
    { a: 2 },
    new Set([2]),
    new Map([[1, 2]])
  ]
)
