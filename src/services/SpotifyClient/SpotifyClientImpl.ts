import { inject } from 'inversify'
import { AxiosRequestConfig } from 'axios'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { encodeBase64 } from '../../utils/StringUtils'
import { AxiosClient } from '../AxiosClient/AxiosClient'
import { EnvConfig } from '../../config/EnvConfig'
import { InversifyTypes } from '../../inversify.config'
import { DynamoDBClient } from '../DynamoDBClient/DynamoDBClient'
import { SpotifyArtist } from '../../interfaces/spotify/SpotifyArtist'
import { SpotifyClient } from './SpotifyClient'
import { SpotifyTrack } from '../../interfaces/spotify/SpotifyTrack'

export interface AccessTokenDetails {
  accessToken: string
  expiresIn: number
  issuedAt: number
}

export class SpotifyClientImpl implements SpotifyClient {
  private static readonly apiBaseUrl = 'https://api.spotify.com/v1/'
  private static readonly accountBaseUrl = 'https://accounts.spotify.com/api/'
  private static readonly tokenUrl = '/token'
  private static readonly searchUrl = '/search'
  private static readonly artistsUrl = '/artists'

  constructor(
    @inject(InversifyTypes.EnvConfig) private envConfig: EnvConfig,
    @inject(InversifyTypes.AxiosClient) private axiosClient: AxiosClient,
    @inject(InversifyTypes.DynamoDBClient) private dynamoClient: DynamoDBClient
  ) {}

  public async getArtistByName(name: string): Promise<SpotifyArtist> {
    const query = `?q=${name}&type=artist`
    const url = SpotifyClientImpl.searchUrl + query

    const { accessToken } = await this.fetchAccessToken()
    const headers = { Authorization: `Bearer ${accessToken}` }

    const config: AxiosRequestConfig = this.getConfig(
      SpotifyClientImpl.apiBaseUrl,
      url,
      headers
    )

    try {
      const {
        data: { artists }
      } = await this.axiosClient.get(config)
      return artists.items.length > 0 ? artists.items[0] : null
    } catch (error) {
      console.error('ERROR GETTING ARTIST: ', error)
    }
  }

  public async getTopTracksByArtistId(id: string): Promise<SpotifyTrack[]> {
    const url = `${SpotifyClientImpl.artistsUrl}/${id}/top-tracks?country=us`

    const { accessToken } = await this.fetchAccessToken()
    const headers = { Authorization: `Bearer ${accessToken}` }

    const config: AxiosRequestConfig = this.getConfig(
      SpotifyClientImpl.apiBaseUrl,
      url,
      headers
    )

    try {
      const {
        data: { tracks }
      } = await this.axiosClient.get(config)
      return tracks
    } catch (error) {
      console.error('ERROR GETTING TOP TRACKS: ', error)
    }
  }

  private async fetchAccessToken(): Promise<AccessTokenDetails> {
    const params: DocumentClient.GetItemInput = {
      TableName: this.envConfig.spotifyTableName,
      Key: {
        id: 'AccessToken'
      }
    }

    const result = await this.dynamoClient.get(params)
    if (result && result.Item) {
      const { expiresIn, issuedAt } = result.Item as AccessTokenDetails

      const now = new Date().getTime()
      const secondsElapsed = (now - issuedAt) / 1000

      if (secondsElapsed > expiresIn) {
        const accessTokenDetails = await this.getNewAccessToken()

        const params: DocumentClient.PutItemInput = {
          TableName: this.envConfig.spotifyTableName,
          Item: { id: 'AccessToken', ...accessTokenDetails }
        }

        try {
          await this.dynamoClient.put(params)
        } catch (error) {
          console.error('ERROR STORING ACCESS TOKEN: ', error)
        }

        return accessTokenDetails
      } else {
        return result.Item as AccessTokenDetails
      }
    } else {
      const accessTokenDetails = await this.getNewAccessToken()

      const params: DocumentClient.PutItemInput = {
        TableName: this.envConfig.spotifyTableName,
        Item: { id: 'AccessToken', ...accessTokenDetails }
      }

      try {
        await this.dynamoClient.put(params)
      } catch (error) {
        console.error('ERROR STORING ACCESS TOKEN: ', error)
      }

      return accessTokenDetails
    }
  }

  private async getNewAccessToken(): Promise<AccessTokenDetails> {
    const clientId = this.envConfig.spotifyClientId
    const clientSecret = this.envConfig.spotifyClientSecret
    const base64auth = encodeBase64(`${clientId}:${clientSecret}`)

    const headers = {
      Authorization: `Basic ${base64auth}`
    }

    const config: AxiosRequestConfig = this.getConfig(
      SpotifyClientImpl.accountBaseUrl,
      SpotifyClientImpl.tokenUrl,
      headers,
      '&grant_type=client_credentials'
    )

    try {
      const { data } = await this.axiosClient.post(config)
      return {
        accessToken: data.access_token,
        expiresIn: data.expires_in,
        issuedAt: Date.now()
      } as AccessTokenDetails
    } catch (error) {
      throw new Error('Error getting auth credential in spotify client.')
    }
  }

  private getConfig(
    baseURL: string,
    url: string,
    headers?: {},
    data?: {} | string
  ): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      baseURL,
      url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers
      },
      data: data ? data : undefined
    }

    return config
  }
}
