import { EnvConfig } from '../../src/config/EnvConfig'

describe('EnvConfig', () => {
  it('All error', () => {
    let error: Error
    try {
      new EnvConfig()
    } catch (err) {
      error = err
    }

    expect(error).toBeDefined()
  })

  it('Should succeed', () => {
    process.env.SPOTIFY_AUTH_TABLE = 'spotifyAuthTable'
    process.env.SPOTIFY_CLIENT_ID = 'spotifyClientId'
    process.env.SPOTIFY_CLIENT_SECRET = 'spotifyClientSecret'

    let error: Error
    try {
      new EnvConfig()
    } catch (err) {
      error = err
    }

    expect(error).toBeUndefined()
  })
})
