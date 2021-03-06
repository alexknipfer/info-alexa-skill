export class EnvConfig {
  public spotifyTableName: string
  public spotifyClientId: string
  public spotifyClientSecret: string

  constructor() {
    if (!process.env.SPOTIFY_AUTH_TABLE) {
      throw new Error('Spotify auth table env not defined')
    }

    if (!process.env.SPOTIFY_CLIENT_ID) {
      throw new Error('Spotify client id env not defined')
    }

    if (!process.env.SPOTIFY_CLIENT_SECRET) {
      throw new Error('Spotify client secret not defined')
    }

    this.spotifyTableName = process.env.SPOTIFY_AUTH_TABLE
    this.spotifyClientId = process.env.SPOTIFY_CLIENT_ID
    this.spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET
  }
}
