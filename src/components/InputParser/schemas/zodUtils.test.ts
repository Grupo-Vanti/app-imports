import { ZodError } from 'zod'

import {
  zodEnforceBoolean,
  zodEnforceInt,
  zodEnforceFloat,
  zodEnforceDateString,
  zodCaseInsensitiveNativeEnum
} from './zodUtils'

describe('check zodEnforceBoolean', () => {
  test('should parse true string text as boolean `true`', () => {
    expect(zodEnforceBoolean(true).parse('true')).toBe(true)
  })

  test('should parse false string text as boolean `false`', () => {
    expect(zodEnforceBoolean(true).parse('false')).toBe(false)
  })

  test('should allow undefined', () => {
    expect(zodEnforceBoolean(true).parse(undefined)).toBe(undefined)
  })

  test('should parse empty string as undefined', () => {
    expect(zodEnforceBoolean(true).parse('')).toBe(undefined)
  })

  test('should return ZodError when is not optional and empty string is passed', () => {
    try {
      zodEnforceBoolean().parse('')
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err).toBeInstanceOf(ZodError)
      }
    }
  })
})

describe('check zodEnforceInt', () => {
  test('should allow int ', () => {
    expect(zodEnforceInt.parse(13)).toBe(13)
  })

  test('should parse string number ', () => {
    expect(zodEnforceInt.parse('13')).toBe(13)
  })

  test('should reject negative ', () => {
    expect(zodEnforceInt.safeParse(0).success).toBe(false)
    expect(zodEnforceInt.safeParse(-4).success).toBe(false)
    expect(zodEnforceInt.safeParse('-7').success).toBe(false)
  })

  test('should reject string float ', () => {
    expect(zodEnforceInt.safeParse('13.5').success).toBe(false)
  })
})

describe('check zodEnforceFloat', () => {
  test('should allow int', () => {
    expect(zodEnforceFloat.parse(13)).toBe(13)
  })

  test('should allow float', () => {
    expect(zodEnforceFloat.parse(13.99)).toBe(13.99)
  })

  test('should parse string number', () => {
    expect(zodEnforceFloat.parse('13')).toBe(13)
  })

  test('should allow string float', () => {
    expect(zodEnforceFloat.parse('13.5')).toBe(13.5)
  })

  test('should reject negative', () => {
    expect(zodEnforceFloat.safeParse(0).success).toBe(false)
    expect(zodEnforceFloat.safeParse(-4).success).toBe(false)
    expect(zodEnforceFloat.safeParse('-7.54').success).toBe(false)
  })
})

describe('check zodEnforceDateString', () => {
  test('should accept full ISO string', () => {
    expect(zodEnforceDateString.parse('2022-07-22T11:15:04.388Z')).toBe(
      '2022-07-22T11:15:04.388Z'
    )
  })

  test('should accept partial date string', () => {
    expect(zodEnforceDateString.parse('2022-07-22')).toBe(
      '2022-07-22T00:00:00.000Z'
    )
  })

  test('should return ZodError when wrong value is passed', () => {
    try {
      zodEnforceDateString.parse('hello123')
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err).toBeInstanceOf(ZodError)
      }
    }
  })
})

describe('check zodCaseInsensitiveNativeEnum', () => {
  test('should allow int', () => {
    enum MyCustomEnum {
      'large' = 'xl',
      'medium' = 'm',
      'small' = 's'
    }
    expect(zodCaseInsensitiveNativeEnum(MyCustomEnum).parse('M')).toBe('m')
    expect(zodCaseInsensitiveNativeEnum(MyCustomEnum).parse('xl')).toBe('xl')
    expect(
      zodCaseInsensitiveNativeEnum(MyCustomEnum).parse(MyCustomEnum.small)
    ).toBe('s')
  })
})
