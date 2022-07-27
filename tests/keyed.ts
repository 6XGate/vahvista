
import test from 'ava'
import vahvista from '../src'
import { passManyFailMany, passOneFailOne } from './utils/macros'

const block = (inner: () => void): void => { inner() }
const mapObj = <V>(obj: Record<string, V>): Map<string, V> => new Map<string, V>(Object.entries(obj))
const setObj = <V>(obj: Record<string, V>): Set<string> => new Set<string>(Object.keys(obj))
const mapArr = <V>(arr: readonly V[]): Map<number, V> => new Map<number, V>(arr.map((value, index) => [index, value]))
const setArr = <V>(arr: readonly V[]): Set<number> => new Set<number>(arr.map((_value, index) => index))
const mapEnt = (arr: Array<[unknown, unknown]>): Map<unknown, unknown> => new Map<unknown, unknown>(arr)
const setEnt = (arr: Array<[unknown, unknown]>): Set<unknown> => new Set<unknown>(arr.map(ent => ent[0]))
const mapFun = (arr: Array<[object, unknown]>): Map<object, unknown> => new Map<object, unknown>(arr)
const setFun = (arr: Array<[object, unknown]>): Set<object> => new Set<object>(arr.map(ent => ent[0]))
const weakMap = (arr: Array<[object, unknown]>): WeakMap<object, unknown> => new WeakMap<object, unknown>(arr)
const weakSet = (arr: Array<[object, unknown]>): WeakSet<object> => new WeakSet(arr.map(ent => ent[0]))

block(() => {
  const good = { name: 1, date: 2, title: 3, extra: 4 }
  const bad = { division: 1, base: 2, term: 3, extra: 4 }

  test('has: property keys: strings', passManyFailMany(vahvista.has('name', 'date', 'title')),
    [good, mapObj(good), setObj(good)],
    [bad, mapObj(bad), setObj(bad)]
  )
})

block(() => {
  const good = ['name', 'date', 'title', 'extra']
  const bad = ['name', 'date']

  test('has: property keys: numbers', passManyFailMany(vahvista.has(0, 1, 2)),
    [good, mapArr(good), setArr(good)],
    [bad, mapArr(bad), setArr(bad)]
  )
})

block(() => {
  const good = [[0, 'name'], [1, 'date'], ['name', 0], ['date', 1], ['title', 3], ['extra', 4]] as
        Array<[number | string, number | string]>
  const bad = [[0, 'name'], [1, 'date'], ['name', 0], ['date', 1]] as
        Array<[number | string, number | string]>

  test('has: property keys: mixed', passManyFailMany(vahvista.has(0, 1, 'name', 'date', 'title')),
    [mapEnt(good), setEnt(good)],
    [bad, mapEnt(bad), setEnt(bad)]
  )
})

block(() => {
  const keys = [/test/u, new Date(), new Error()]
  const ekeys = [new ReferenceError()]

  const good = [[keys[0], 0], [keys[1], 1], [keys[2], 2], [ekeys[0], 3]] as
        Array<[object, unknown]>
  const bad = [[keys[0], 0], [keys[1], 1]] as
        Array<[object, unknown]>

  test('has: any kind of keys', passManyFailMany(vahvista.has(...keys)),
    [mapFun(good), setFun(good), weakMap(good), weakSet(good)],
    [mapFun(bad), setFun(bad), weakMap(bad), weakSet(bad)]
  )
})

block(() => {
  const good = { name: 1, date: 2, term: 3, extra: 4 }
  const bad = { division: 1, base: 2, term: 3, extra: 4 }

  test('has any: property keys: strings', passManyFailMany(vahvista.hasAny('name', 'date', 'title')),
    [good, mapObj(good), setObj(good)],
    [bad, mapObj(bad), setObj(bad)]
  )
})

block(() => {
  const good = ['name', 'date', 'title', 'extra']
  const bad = [] as string[]

  test('has any: property keys: numbers', passManyFailMany(vahvista.hasAny(0, 1, 2)),
    [good, mapArr(good), setArr(good)],
    [bad, mapArr(bad), setArr(bad)]
  )
})

block(() => {
  const good = [[0, 'name'], [2, 'date'], ['name', 0], ['date', 1], ['term', 3], ['extra', 4]] as
        Array<[number | string, number | string]>
  const bad = [[3, 'name'], [4, 'date'], ['set', 0], ['map', 1]] as
        Array<[number | string, number | string]>

  test('has any: property keys: mixed', passManyFailMany(vahvista.hasAny(0, 1, 'name', 'date', 'title')),
    [mapEnt(good), setEnt(good)],
    [mapEnt(bad), setEnt(bad)]
  )
})

block(() => {
  const keys = [/test/u, new Date(), new Error()]
  const ekeys = [new ReferenceError(), new TypeError(), new SyntaxError()]

  const good = [[keys[0], 0], [keys[1], 1], [ekeys[2], 2], [ekeys[0], 3]] as
        Array<[object, unknown]>
  const bad = [[ekeys[0], 0], [ekeys[1], 1]] as
        Array<[object, unknown]>

  test('has any: any kind of keys', passManyFailMany(vahvista.hasAny(...keys)),
    [mapFun(good), setFun(good), weakMap(good), weakSet(good)],
    [mapFun(bad), setFun(bad), weakMap(bad), weakSet(bad)]
  )
})

test('has on invalid input', passOneFailOne(vahvista.has('key')), { key: 1 }, 4)
