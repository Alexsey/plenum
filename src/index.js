'use strict'

const {
  cloneDeep, forEach, isArray, zipObject
} = require('lodash')

const values = Symbol('privateState')
const defaultValue = Symbol('defaultValue')

module.exports = function plenumFactory (dict, proto) {
  const dictObj = isArray(dict) ? zipObject(dict, dict) : cloneDeep(dict)

  forEach(dictObj, (val, key) => {
    dictObj[key] = String(val)
  })

  return create(dictObj, proto)
}


function create (dict, proto = {}) {
  let lock = false
  const Plenum = function (val) {
    if (lock) throw Error('Plenum functions should not be called')
    this[values] = {[defaultValue]: val}
  }
  Plenum.prototype = Object.create(PlenumBase.prototype, proto)
  forEach(dict, (val, key) => Plenum[key] = new Plenum(val))
  lock = true
  return Plenum
}

class PlenumBase {

}