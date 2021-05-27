/* istanbul ignore file */
import './categories/is'
import './categories/value'
import './categories/boolean'
import './categories/number'
import './categories/collection'
import './categories/array-like'
import './categories/array'
import './categories/string'
import './categories/keyed'
import './categories/error'
import './categories/namable'
import './categories/tuple'
import './categories/object'
import { vahvista } from './vahvista'
import type { Rules, Validator, ValidatorFactory, Predicate } from './vahvista'

export { Rules, Validator, ValidatorFactory, Predicate }
export default vahvista
