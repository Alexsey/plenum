'use strict'

const util = require('util')

const {isFunction, isString} = require('lodash')

const format = (...args) => isString(args[0]) ? `'${util.format(...args)}'` : util.format(...args)

expect.extend({
  toBeFunction: obj => ({
    message: () => `expected ${isString(obj) ? `'${obj}'` : format(obj)} to be a function`,
    pass: isFunction(obj),
  }),
  toEqualPlenum: (pl1, pl2) =>
         !(pl1 instanceof Array && Object.getPrototypeOf(pl1) !== Array.prototype) && {
      message: () => `expected to compare plenum sets but expect() argument is ${format(pl1)}`,
      pass: false,
    } || !(pl2 instanceof Array && Object.getPrototypeOf(pl2) !== Array.prototype) && {
      message: () =>
        `expected to compare plenum sets but .toEqualPlenum() argument is ${format(pl2)}`,
      pass: false,
    } || !(pl1.length == pl2.length && pl1.map(String).every((pl1Val, i) => pl1Val == pl2[i])) && {
      message: () => `expected plenum ${
        pl1 && pl1.map ? pl1.map(val => format(val)).join(', ') : pl1} to be equal plenum ${
        pl2 && pl2.map ? pl2.map(val => format(val)).join(', ') : pl2}`,
      pass: false,
    } || {
      message: '',
      pass: true,
    },
})
