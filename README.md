# vahvista

Simple composable validation framework

![Lint test](https://github.com/6XGate/vahvista/workflows/Lint%20test/badge.svg?branch=develop)
![Test coverage](https://github.com/6XGate/vahvista/workflows/Test%20coverage/badge.svg?branch=develop)
![Build test](https://github.com/6XGate/vahvista/workflows/Build%20test/badge.svg?branch=develop)

## License

_vahvista_ is licensed under the [MIT](LICENSE) license.

## Getting Started

### Requirements

Under [node.js](https://nodejs.org/), or a bundler such as [webpack](https://webpack.js.org/) or
[rollup](https://rollupjs.org/); _vahvista_ has no additional requirement.
When using the browser ready package, [lodash](https://lodash.com/) must be loaded to use _vahvista_.

### Installation

#### Bundler or node build

If you want to use _vahvista_ with a bundler like [webpack](https://webpack.js.org/) or
[rollup](https://rollupjs.org/), or with [node.js](://nodejs.org/);

- Install _vahvista_ with your favorite package manager;
    - [npm](https://www.npmjs.com/); `npm install --save-dev vahvista`.
    - [yarn](https://yarnpkg.com/); `yarn add vahvista --dev`
    - [pnpm](https://pnpm.js.org/); `pnpm add -D vahvista`

#### Browser ready or CDN build

If you wish to use _vahvista_ in an environment that does not use a bundler or modules; you have two options

- Download the `vahvista.iife.js` file from the latest release and include it in your project.
- Link to it from UNPKG CDN `https://unpkg.com/vahvista/dist/index.iife.js` or
  `https://unpkg.com/vahvista@{version}/dist/index.iife.js`. See [UNPKG](https://unpkg.com/) for more versioning
  options.
- Link to it from JSDELIVR CDN `https://cdn.jsdelivr.net/npm/vahvista/dist/index.iife.js` or
  `https://cdn.jsdelivr.net/npm/vahvista@{version}/dist/index.iife.js`. See [JSDELIVR](https://www.jsdelivr.com/)
  for more versioning options.

### Basic validation

To use _vahvista_, simply `import vahvista from "vahvista";`. Or you may use a shorter name with
`import v from "vahvista";`  

_vahvista_ is relatively simple to use for validation. It does provide any messaging feedback, but does allow you to
chain a set of rules together and verify that a value passes those rules.

> Does _x_ = _4_? `v.equals(4)(x)`.
> Is _x_ between _2_ and _10_ and an integer? `v.integer.inRange(2, 10)(x)`
> Is _name_ an all lower-case alphabetic name? `v.alphabetic.lowerCase(name)`. 

## Core concepts

_vahvista_ is based on two concepts, _rules_ and _predicates_. Although these concepts externally seem the same, one
builds the other.

### Rules

Rules are the basic building blocks of _vahvista_ validation. Rules are used to build predicates and verify some aspect
of a value to be tested. Rules are wrapped into predicates by _vahvista_ and accessed via their names from _vahvista_
itself.

### Predicates

A predicate is any object from _vahvista_ than can be called to verify a value. Predicates may also be chained to form
new predicates that will ensure a value is verified by all rules in the predicate chain.

## Rules

### Type checks

Basic type checking rules.

- `undefined`: is the value `undefined`.
- `null`: is the value `null`.
- `nil`: is the value `null` or `undefined`.
- `value`: is the value a simple type such as _boolean_, _number_, _bigint_, or _string_ or boxed instance.
- `boolean`: is the value a _boolean_ or boxed `Boolean` instance.
- `number`: is the value a _number_ of boxed `Number` instance.
- `nan`: is the value a `NaN`.
- `symbol`: is the value a _symbol_.
- `arrayLike`: is the value array-like, an object with `length` and indexed elements. 
- `array`: is the value an `Array`.
- `string`: is the value a _string_ or boxed `String` instance.
- `arrayBuffer`: is the value an `ArrayBuffer` instance.
- `buffer`: is the value a `Buffer` instance.
- `dataView`: is the value a `DataView` instance.
- `typedArray`: is the value one of the typed array, such as `Uint32Array`, `Int32Array`, `Float64Array`, etc.
- `uint32Array`: is the value an `Uint32Array` instance.
- `uint16Array`: is the value an `Uint16Array` instance.
- `uint8Array`: is the value an `Uint8Array` instance.
- `int32Array`: is the value an `Int32Array` instance.
- `int16Array`: is the value an `Int16Array` instance.
- `int8Array`: is the value an `Int8Array` instance.
- `float64Array`: is the value an `Float64Array` instance.
- `float32Array`: is the value an `Float32Array` instance.
- `uint8ClampedArray`: is the value an `Uint8ClampedArray` instance.
- `function`: is the value a _function_.
- `regExp`: is the value a `RegExp` instance.
- `object`: is the value an _object_.
- `error`: is the value an `Error` or derivative instance.
- `date`: is the value a `Date` instance.
- `iterable`: is the value an _iterable_ object.
- `iterator`: is the value an `Iterator` implementation.
- `promise`: is the value a `Promise` instance or promise-like object.
- `set`: is the value a `Set` instance.
- `weakSet`: is the value a `WeakSet` instance.
- `map`: is the value a `Map` instance.
- `weakMap`: is the value a `WeakMap` instance.
- `enum([...values])`: is the value one of the provided `values`.
- `typeOf(type)`: does the value identify as `type` with the `typeof` operator. Example are `"string"`, `"object"`.  
- `instanceOf(constructor)`: is the value an instance create by the provided class or `constructor`.

### Values

Many values maybe compared with certain basic equality or relational comparisons. Such values include _numbers_ and
_strings_. Object references also may be strictly equal if a value references the exact same object.  

- `oneOf(...values)`: is the value one of the provided `values`.
- `equal(target)`: is the value strictly equal to `target`.
- `notEqual(target)`: is the value not strictly equal to `target`.
- `greaterThan(target)`: is the value greater than `target`.
- `greaterThanOrEqual(target)`: is the value greater than or equal to `target`.
- `lessThan(target)`: is the value less than `target`.
- `lessThanOrEqual(target)`: is the value less than or equal to `target`.

### Boolean logic

The boolean rule can check whether a value is strictly a boolean value; or if they are
[truthy](https://developer.mozilla.org/docs/Glossary/Truthy) or
[falsy](https://developer.mozilla.org/docs/Glossary/Falsy). 

- `true`: is the value strictly `true`.
- `truthy`: is the value [truthy](https://developer.mozilla.org/docs/Glossary/Truthy).
- `false`: is the value strictly `false`.
- `falsy`: is the value [falsy](https://developer.mozilla.org/docs/Glossary/Falsy).

### Numbers

- `negative`: is the value negative, meaning less than zero.
- `positive`: is the value positive, meaning greater than zero.
- `finite`: is the value finite, meaning not equal to `Infinity` or `-Infinity`.
- `infinite`: is the value infinite, meaning equal to `Infinity` or `-Infinity`.
- `uint32`: is the value within the range of the 32-bit unsigned integer, meaning inclusively between 0 and 4294967295.
- `uint16`: is the value within the range of the 16-bit unsigned integer, meaning inclusively between 0 and 65535.
- `uint8`: is the value within the range of the 8-bit unsigned integer, meaning inclusively between 0 and 255.
- `int32`: is the value within the range of the 32-bit signed integer, meaning inclusively between -2147483648 and 2147483647.
- `int16`: is the value within the range of the 32-bit signed integer, meaning inclusively between -32768 and 32767.
- `int8`: is the value within the range of the 32-bit signed integer, meaning inclusively between -128 and 127.
- `integer`: is the value an integer, meaning it has no fractional part.
- `integerOrInfinite`: is the value an integer or infinite.
- `inRange(min, max)`: is the value inclusively between `min` and `max`.

### Collections

Collection are objects that have enumerable elements within them. Examples would be array-like objects with indexed
element within its `length`, objects with named enumerable elements or properties, and maps with keyed elements.

- `empty`: is the value empty, meaning it is not a collection or contains no enumerable elements. 
- `notEmpty`: is the value not empty, meaning it contains one or more enumerable elements.
- `size(n)`: does the value have `n` enumerable elements.
- `maxSize(max)`: does the value have no more than `max` enumerable elements.
- `minSize(min)`: does the value have at least `min` enumerable elements.

### Array-like objects

Array-like objects are values or objects with a readable `length` property and indexed elements. One such value is a
string. `Array`s are definitely considered array-like, but _objects_ may implement the semantics of an array.

- `length(n)`: does the value have a `length` of `n`.
- `maxLength(max)`: does the value have a `length` no greater than `max`.
- `minLength(min)`: does the value have a `length` of at least `min`.

### Arrays

- `includes(...items)`: does the value include all the items.
- `includesAny(...items)`: does the value include any of the items.

### Strings

- `alphabetic`: is the value an alphabetic string.
- `alphaNumeric`: is the value an alpha-numeric string.
- `dateLike`: is the value a date-like string, meaning that it may be parsed with `Date#parse`.
- `numeric`: is the value a numeric string.
- `integral`: is the value an integer string.
- `lowerCase`: is the value a completely lower-case string.
- `upperCase`: is the value a completely upper-case string.
- `url`: is the value a URL, meaning it can be parsed with `new URL`.
- `contains(target)`: does the value contain the `target` string.
- `endsWith(target)`: does the value end with the `target` string.
- `startsWith(target)`: does the value start with the `target` string.
- `matches(expression)`: does the value match the regular `expression`.

### Keyed collections

A keyed collection is any _object_ that posses some means of access values based on a key. A key may be a _string_,
_number_, or with certain collections such as `Map`, any kind of value. _Objects_ and _arrays_ may be considered keyed
collects since some _string_ or _numeric_ value may be used as a key to another value of any kind. `Set`s may also be
considered keyed collection since a value is its own key.

- `has(...keys)`: does the value have all the specified `keys`.
- `hasAny(...keys)`: does the value have any of the specified `keys`.

### Errors

- `evalError`: is the value an `EvalError` or derivative instance.
- `rangeError`: is the value a `RangeError` or derivative instance.
- `referenceError`: is the value a `ReferenceError` or derivative instance.
- `syntaxError`: is the value a `SyntaxError` or derivative instance.
- `typeError`: is the value a `TypeError` or derivative instance.
- `uriError`: is the value an `URIError` or derivative instance.

### Named objects

A named object is any object that has a `name` property. Some examples are _functions_, `Error`s, and `File`s.

- `name(match)`: does the value `name` match the `match` string or regular expression.

### Tuples

Tuples are collections of fixed length and element types. In JavaScript the closest thing to this would be an array of a
specific `length`.

- `tuple(...predicates)`: does the array have the exact number of elements matches the `predicates`.

### Object shapes 

`shape(definition)` tests whether a value conform to `definition`.

The definition may be composed of the following:
- An object which contains properties with other `definitions` or _predicates_.
- An array with a single element containing a `definition` or _predicate_.
- A single lone _predicate_.

An example shape definition could be:

```js
shape({
    name:       v.string.notEmpty.maxLength(45),
    dataPoints: [v.integer.inRange(-256, 256)],
    meta:       v.object,
    style: {
        color:     v.enum(knownColors),
        fill:      v.enum(knownColors),
        thickness: v.number.finite,
    },
})
```

## Custom rules

_vahvista_ may be extended with custom rules. This is done with `vahvista.register` and `vahvista.factory`.

### Basic rules

Basic rule do not require any additional information to verify a value. They are simply a function that receives the
value and returns `true` if the value passes or `false` if it fails. An example of a basic rule may be one that ensure
an ID value is a string containing a positive integer.

```js
v.register("id", value => (/\d+/u).test(value));
```

### Rules with inputs

If a rule needs more information to verify a value, they may be given arguments. Such rules must be created from a "rule
factory". A rule factory is a function that accepts the information needed for the rule to do its job and returns that
rule with the needed information. An example of such a rule may be one that verifies a date is later than another.

```js
v.factory("after", date => value => toDate(dateTime).valueOf() < toDate(value).valueOf());
// use as `v.after(Date.now())(tomorrow)` which would be true.
```

### TypeScript

_vahvista_ works well with TypeScript since it was built in TypeScript. There is one caveat of using _vahvista_ in
TypeScript that you must contend with when adding custom rules. You must tell TypeScript the predicate for those rules
now exist in _vahvista_. To do so, you must use interface declaration merging. An example using those the prior two
examples:

```ts
v.register<string>("id", value => (/\d+/u).test(value));
v.factory<string|Date>("after", (date: string|Date) => value => toDate(dateTime).valueOf() < toDate(value).valueOf());

declare module "vahvista" {
    interface Rules<T> {
        id: Predicate<string>;
        after(date: string|Date): Predicate<string|Date>;
    }
}
```

Other things to note about rules registered in TypeScript;

- The generic argument for `factory` and `register` denote the expected input of the rule, though this is not guaranteed.
- The generic argument for `Predicate` is the confirmed type after being verified by the rule.
- The generic argument `T` for `Rule` is current type predicate chain.
