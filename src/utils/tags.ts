/* eslint-disable @typescript-eslint/ban-types -- Some must be used to satisfy basic constraints */

const toStringTag = (value: unknown): string => Object.prototype.toString.call(value)

export const kUndefinedTag = '[object Undefined]' as const
export const kNullTag = '[object Null]' as const
export const kBooleanTag = '[object Boolean]' as const
export const kNumberTag = '[object Number]' as const
export const kStringTag = '[object String]' as const
export const kArrayTag = '[object Array]' as const
export const kArgumentsTag = '[object Arguments]' as const
export const kErrorTag = '[object Error]' as const
export const kDateTag = '[object Date]' as const
export const kRegExpTag = '[object RegExp]' as const
export const kMapTag = '[object Map]' as const
export const kSetTag = '[object Set]' as const
export const kWeakMapTag = '[object WeakMap]' as const
export const kWeakSetTag = '[object WeakSet]' as const
export const kArrayBufferTag = '[object ArrayBuffer]' as const

export const TypeTags = [
  kUndefinedTag,
  kNullTag,
  kBooleanTag,
  kNumberTag,
  kStringTag,
  kArrayTag,
  kArgumentsTag,
  kErrorTag,
  kDateTag,
  kRegExpTag,
  kMapTag,
  kSetTag,
  kWeakMapTag,
  kWeakSetTag,
  kArrayBufferTag
] as const
export type TypeTags = typeof TypeTags[number]

export type TagOf<T extends TypeTags> =
  T extends typeof kUndefinedTag ? undefined
    : T extends typeof kNullTag ? null
      : T extends typeof kBooleanTag ? boolean
        : T extends typeof kNumberTag ? number
          : T extends typeof kStringTag ? string
            : T extends typeof kArrayTag ? unknown[]
              : T extends typeof kArgumentsTag ? IArguments
                : T extends typeof kErrorTag ? Error
                  : T extends typeof kDateTag ? Date
                    : T extends typeof kRegExpTag ? RegExp
                      : T extends typeof kMapTag ? Map<unknown, unknown>
                        : T extends typeof kSetTag ? Set<unknown>
                          : T extends typeof kWeakMapTag ? WeakMap<object, unknown>
                            : T extends typeof kWeakSetTag ? WeakSet<object>
                              : T extends typeof kArrayBufferTag ? ArrayBuffer
                                : never

export function getTag (value: unknown): string {
  return toStringTag(value)
}
