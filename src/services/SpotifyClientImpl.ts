import { inject } from 'inversify'
import { AxiosRequestConfig } from 'axios'
import { encodeBase64 } from '../utils/StringUtils'
import { AxiosClient } from './AxiosClient/AxiosClient'
import { EnvConfig } from '../config/EnvConfig'
import { InversifyTypes } from '../inversify.config'
import { DynamoDBClient } from './DynamoDBClient/DynamoDBClient'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

interface AccessTokenDetails {
  accessToken: string
  expiresIn: number
  issuedAt: number
}

export class SpotifyClientImpl {
  private static readonly baseUrl = 'https://accounts.spotify.com/api/'
  private static readonly tokenUrl = '/token'

  constructor(
    @inject(InversifyTypes.EnvConfig) private envConfig: EnvConfig,
    @inject(InversifyTypes.AxiosClient) private axiosClient: AxiosClient,
    @inject(InversifyTypes.DynamoDBClient) private dynamoClient: DynamoDBClient
  ) {}

  public async fetchAccessToken() {
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
          throw error
        }

        return accessTokenDetails
      } else {
        return result.Item
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
        throw error
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
