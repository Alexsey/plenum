'use strict'

const {format} = require('util')

const {isFunction, isString} = require('lodash')

const plenum = require('../src')

expect.extend({toBeFunction: obj => ({
  message: () => `expected ${isString(obj) ? `'${obj}'` : format(obj)} to be a function`,
  pass: isFunction(obj)
})})

it('Should export a function', () => {
  expect(plenum).toBeFunction()
})

describe('Plenum instance', () => {
  it('Should be an object', () => {
    const days = plenum({
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Sunday',
      sat: 'Sunday',
      sun: 'Sunday',
    })

    expect(days).toHaveProperty('mon')
    expect(days).toHaveProperty('tue')
    expect(days).toHaveProperty('wed')
    expect(days).toHaveProperty('thu')
    expect(days).toHaveProperty('fri')
    expect(days).toHaveProperty('sat')
    expect(days).toHaveProperty('sun')
  })
})