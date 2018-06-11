import { AxiosRequestConfig } from 'axios'
import { encodeBase64 } from '../utils/StringUtils'
import { AxiosClientImpl } from './AxiosClient/AxiosClientImpl'

export class SpotifyClientImpl {
  private axiosClient: any
  private static readonly baseUrl = 'https://accounts.spotify.com/api/'
  private static readonly tokenUrl = '/token'

  constructor() {
    this.axiosClient = new AxiosClientImpl()
  }

  public async getAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const base64auth = encodeBase64(`${clientId}:${clientSecret}`)

    const headers = {
      Authorization: `Basic ${base64auth}`
    }

    const config: AxiosRequestConfig = this.getConfig(
      SpotifyClientImpl.tokenUrl,
      headers,
      '&grant_type=client_credentials'
    )

    try {
      const { data } = await this.axiosClient.post(config)
      console.log('RESULT: ', data)
    } catch (error) {
      console.log('THERE WAS AN ERROR: ', error)
    }
  }

  private getConfig(
    url: string,
    headers?: {},
    data?: {} | string
  ): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      baseURL: SpotifyClientImpl.baseUrl,
      url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers
      },
      data: data ? data : {}
    }

    return config
  }
}
