'use strict'

const {format} = require('util')

const {isFunction, isString} = require('lodash')

expect.extend({toBeFunction: obj => ({
  message: () => `expected ${isString(obj) ? `'${obj}'` : format(obj)} to be a function`,
  pass: isFunction(obj)
})})