'use strict'

const plenum = require('../src')

describe('Plenum function ->', () => {
  it('Should be a function', () => {
    expect(plenum).toBeFunction()
  })

  describe('First argument is an array ->', () => {
    it('Should throw if first argument is not an array', () => {
      expect(() => plenum('bla'))
        .toThrow("The first argument of plenum function must be an array but provided 'bla'")
    })
    it('Should throw if item of first array argument is not a string, String or number', () => {
      expect(() => plenum([{}])).toThrow('All items of the first array argument of plenum ' +
        'function must be strings, Strings or numbers but provided {}')
    })
    it('Should not throw if first argument is an array of strings', () => {
      expect(() => plenum(['bla'])).not.toThrow()
    })
    it('Should not throw if first argument is an array of numbers', () => {
      expect(() => plenum([1, 2, 3])).not.toThrow()
    })
    it('Should not throw if first argument is an array of String objects', () => {
      expect(() => plenum([new String('a'), new String('b')])).not.toThrow()
    })
    it('Should not throw if first argument is an array of mix of allowed elements', () => {
      expect(() => plenum([new String('a'), 'b', 3])).not.toThrow()
    })
    it('Should convert number values to strings', () => {
      const primesTill10Numbers = plenum([1, 2, 3, 4, 5])
      const primesTill10Strings = plenum(['1', '2', '3', '4', '5'])

      expect(primesTill10Numbers).toEqualPlenum(primesTill10Strings)
    })
  })
})

describe('Plenum set ->', () => {
  describe('prototype', () => {
    it('Should be set by second argument of plenum function', () => {
      const prototype = {specialField: () => {}}

      const times = plenum(['winter', 'spring', 'summer', 'autumn'], prototype)

      expect(Object.getPrototypeOf(times)).toEqual(prototype)
    })

    it('Should be set by second argument of plenum function', () => {
      const times = plenum(['winter', 'spring', 'summer', 'autumn'], {
        get isHot () {
          return this.is.spring.or.summer
        }
      })

      expect(times.winter.isHot).toBeFalsy()
      expect(times.summer.isHot).toBeTruthy()
    })
  })

  it('Should be instanceof Array', () => {
    const times = plenum(['winter', 'spring', 'summer', 'autumn'])

    expect(times).toBeInstanceOf(Array)
  })

  it('Should have all elements as keys', () => {
    const times = plenum(['winter', 'spring', 'summer', 'autumn'])

    expect(times).toHaveProperty('winter', times[0])
    expect(times).toHaveProperty('spring', times[1])
    expect(times).toHaveProperty('summer', times[2])
    expect(times).toHaveProperty('autumn', times[3])
  })

  // todo think over
  it.skip('Should be instanceof plenum function', () => {
    const times = plenum(['winter', 'spring', 'summer', 'autumn'])

    expect(times).toBeInstanceOf(plenum)
  })
})

describe('Plenum instance ->', () => {
  it('Should be instanceof String', () => {
    const times = plenum(['winter', 'spring', 'summer', 'autumn'])

    expect(times.winter).toBeInstanceOf(String)
  })
  // todo think over below
  it.skip('Should be instanceof plenum function', () => {
    const times = plenum(['winter', 'spring', 'summer', 'autumn'])

    expect(times.winter).toBeInstanceOf(plenum)
  })

  it.skip('Should be instanceof plenum set it is a part of', () => {
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

  it.skip('Should not be instanceof plenum set it is not a part of', () => {
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
