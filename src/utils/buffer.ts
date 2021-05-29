import { getTag } from './tags'

/* istanbul ignore next */ // Coverage always runs in node.
const theExports =
  typeof exports === 'object' &&
  exports != null &&
  !(exports as { nodeType: boolean }).nodeType
    ? exports as unknown
    : undefined
/* istanbul ignore next */ // Coverage always runs in node.
const theModule =
  theExports != null &&
  typeof module === 'object' &&
  (module as undefined|null|NodeModule) != null &&
  !(module as unknown as { nodeType: boolean }).nodeType
    ? module
    : undefined
/* istanbul ignore next */ // Coverage always runs in node.
const isNodeJs = theModule?.exports === theExports
/* istanbul ignore next */ // Coverage always runs in node.
const NodeBuffer = isNodeJs ? global.Buffer : undefined

/* istanbul ignore next */ // Coverage always runs in node.
export const isBuffer = NodeBuffer != null ? (value: unknown) => NodeBuffer.isBuffer(value) : () => false

const typedArrayTagPattern = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|(?:BigInt|BigUint)64|Uint8Clamped)Array\]$/u

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array

export function isTypedArray (value: unknown): value is TypedArray {
  return typedArrayTagPattern.test(getTag(value))
}
