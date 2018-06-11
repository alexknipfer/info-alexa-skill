import { encodeBase64 } from '../../src/utils/StringUtils'

describe('StringUtils', () => {
  it('Should encode to base64', () => {
    const expected = 'dGVzdFN0cmluZw=='
    expect(encodeBase64('testString')).toEqual(expected)
  })
})
