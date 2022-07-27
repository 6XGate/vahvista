import test from 'ava'
import vahvista from '../../src'
import { passOneFailOne } from '../utils/macros'

test('cannot match undefined', passOneFailOne(vahvista.matches(/undefined/u)), 'undefined', undefined)
