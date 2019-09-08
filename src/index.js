'use strict'

const util = require('util')

const {isArray, isString, isNumber} = require('lodash')

const format = (...args) => isString(args[0]) ? `'${util.format(...args)}'` : util.format(...args)

class PlenumSet extends Array {}
class PlenumInstance extends String {}

module.exports = function plenum (dict, proto) {
  if (!isArray(dict))
    throw Error(
      `The first argument of plenum function must be an array but provided ${format(dict)}`
    )

  dict.forEach(item => {
    if (!isString(item) && !isNumber(item))
      throw Error('All items of the first array argument of plenum function must be strings, ' +
        `Strings or numbers but provided ${format(item)}`)
  })

  const pSet = new PlenumSet(...dict.map(v => new PlenumInstance(v)))
  pSet.forEach(v => pSet[v] = v)

  return pSet
}
