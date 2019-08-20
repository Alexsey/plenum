'use strict'

const plenum = require('../src')

describe('Plenum function ->', () => {
  it('Should be a function', () => {
    expect(plenum).toBeFunction()
  })

  describe('First argument is an object ->', () => {
    it('Should create a new plenum when all properties are strings', () => {
      const days = plenum({
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday',
      })

      expect(days).toEqual({
        mon: days.mon,
        tue: days.tue,
        wed: days.wed,
        thu: days.thu,
        fri: days.fri,
        sat: days.sat,
        sun: days.sun,
      })
    })

    it('Should convert number values to strings', () => {
      const primesTill10Numbers = plenum({
        'two': 2,
        'three': 3,
        'five': 5,
        'seven': 7,
      })
      const primesTill10Strings = plenum({
        'two': '2',
        'three': '3',
        'five': '5',
        'seven': '7',
      })

      expect(primesTill10Numbers).toEqual(primesTill10Strings)
    })

    it('Should throw if some value is not a string or number', () => {
      expect(plenum(() => ({
        mon: 'Monday',
        tue: 'Tuesday',
        wed: ['Wednesday'],
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: ['Sunday'],
      }))).toThrow({
        message: 'All elements of object or first argument of plenum function must be string or ' +
          `numbers, but on key 'wed' is ['Wednesday'] and key 'sun' is ['Sunday']`,
      })
    })
  })

   describe('First argument is an array ->', () => {
     it('Should be the same as creation from object ' +
       'when all elements or array are strings and keys of object and equal to its values', (
     ) => {
       const daysFromArray = plenum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])
       const daysFromObj = plenum({
         mon: 'mon',
         tue: 'tue',
         wed: 'wed',
         thu: 'thu',
         fri: 'fri',
         sat: 'sat',
         sun: 'sun',
       })

       expect(daysFromArray).toEqual(daysFromObj)
     })

     it('Should convert numbers elements to strings', () => {
       const primesTill10Numbers = plenum([2, 3, 5, 7])
       const primesTill10Strings = plenum(['2', '3', '5', '7'])

       expect(primesTill10Numbers).toEqual(primesTill10Strings)
     })

     it('Should throw is some elements are not strings or numbers', () => {
       expect(() => plenum(['mon', 'tue', 'wed', ['thu'], 'fri', 'sat', ['sun']])).toThrow({
         message: 'All elements of array or first argument of plenum function must be string or ' +
           `numbers, but on positions 3 there is ['thu'] and on position 6 there is ['sun']`,
       })
     })
   })
})

describe('Plenum set ->', () => {
  describe('prototype', () => {
    it('Should be set by second argument of plenum function', () => {
      const prototype = {}

      const days = plenum({
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday',
      }, {})

      expect(Object.getPrototypeOf(days)).toBe(prototype)
    })

    it('Should be set by second argument of plenum function', () => {
      const days = plenum({
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday',
      }, {
        get isWeekend () {
          return this.is.sat.or.sun
        }
      })

      expect(days.mon.isWeekend).toBeFalsy()
      expect(days.sat.isWeekend).toBeTruthy()
    })
  })
})

describe('Plenum instance ->', () => {
  it('Should be instanceof plenum function', () => {
    const days = plenum({
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday',
    })

    expect(days).toBeInstanceOf(plenum)
  })

  it('Should be instanceof plenum set it is a part of', () => {
    const days = plenum({
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday',
    })

    expect(days.mon).toBeInstanceOf(days)
  })

  it('Should not be instanceof plenum set it is not a part of', () => {
    const days = plenum({
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday',
    })

    const seasons = plenum(['Winter', 'Spring', 'Summer', 'Autumn'])

    expect(days.mon).not.toBeInstanceOf(seasons)
  })
})