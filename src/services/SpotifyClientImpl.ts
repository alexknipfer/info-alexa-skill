import { AxiosRequestConfig } from 'axios'
import { encodeBase64 } from '../utils/StringUtils'

export class SpotifyClientImpl {
  private static readonly tokenUrl = '/api/token'

  public getAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const base64auth = encodeBase64(`${clientId}:${clientSecret}`)
  }
}
