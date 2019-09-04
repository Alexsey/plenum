'use strict'

const {format} = require('util')

const {isFunction, isString} = require('lodash')

expect.extend({
  toBeFunction: obj => ({
    message: () => `expected ${isString(obj) ? `'${obj}'` : format(obj)} to be a function`,
    pass: isFunction(obj),
  }),
  toEqualPlenum: (pl1, pl2) => ({
    message: () => `expected plenum ${
      pl1 && pl1.map ? pl1.map(String) : pl1} to be equal plenum ${
      pl2 && pl2.map ? pl2.map(String) : pl2}`,
    pass: pl1 instanceof Array
       && pl2 instanceof Array
       && expect(pl1.map(String)).toEqual(pl2.map(String)),
  }),
})