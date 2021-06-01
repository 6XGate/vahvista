import test from 'ava'
import vahvista from '../src'
import { passOneFailMany, passOneFailOne } from './utils/macros'

function block (code: () => void): void {
  code()
}

test('bad shape: root', t => {
  const oops = 5
  t.throws(() => {
    // @ts-expect-error Testing checks in shape
    vahvista.shape(oops)(oops)
  }, {
    instanceOf: TypeError,
    message: 'Shape input not a valid value, expected a predicate, array, or object'
  })
})

test('bad shape: element', t => {
  const oops = { bad: 5 }
  t.throws(() => {
    // @ts-expect-error Testing checks in shape
    vahvista.shape(oops)(oops)
  }, {
    instanceOf: TypeError,
    message: 'Shape has invalid property at bad, expected a predicate, array, or object'
  })
})

block(() => {
  const shape = {
    base: vahvista.string.startsWith('base_').minLength(6),
    points: [vahvista.integer],
    names: {
      first: vahvista.string.notEmpty,
      last: vahvista.string.notEmpty
    }
  }

  const good = {
    base: 'base_set',
    points: [3, 5, 2, 1],
    names: {
      first: 'test',
      last: 'object'
    }
  }

  const notGood = [
    {
      base: 'b',
      points: [],
      names: {
        first: 'test',
        last: 'object'
      }
    },
    {
      base: 'base_set',
      points: 5,
      names: {
        first: 'test',
        last: 'object'
      }
    },
    10
  ]

  test('shape', passOneFailMany(vahvista.shape(shape)), good, notGood)
})

block(() => {
  const good = {
    monday: 5,
    tuesday: 3,
    friday: 12
  }

  const bad = {
    monday: '5',
    tuesday: NaN,
    friday: new Date()
  }

  test('dict', passOneFailOne(vahvista.dict(vahvista.number)), good, bad)
})
