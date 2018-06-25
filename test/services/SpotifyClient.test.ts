import { EnvConfig } from '../../src/config/EnvConfig'
import { SpotifyClient } from '../../src/services/SpotifyClient/SpotifyClient'
import { SpotifyClientImpl } from '../../src/services/SpotifyClient/SpotifyClientImpl'
import { AxiosClient } from '../../src/services/AxiosClient/AxiosClient'
import { DynamoDBClient } from '../../src/services/DynamoDBClient/DynamoDBClient'
import { getSpotifyArtist } from '../testUtils'
import { SpotifyArtist } from '../../src/interfaces/spotify/SpotifyArtist'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { AxiosRequestConfig } from 'axios'

describe('SpotifyClient', () => {
  let spotifyClient: SpotifyClient
  let axiosClientMock: AxiosClient
  let dynamoDBClientMock: DynamoDBClient
  let envConfigMock: EnvConfig
  const AxiosClientMock = jest.fn<AxiosClient>()
  const DynamoDBClientMock = jest.fn<DynamoDBClient>()
  const EnvConfigMock = jest.fn<EnvConfig>(() => ({
    spotifyTableName: 'spotifyTable'
  }))

  beforeEach(() => {
    axiosClientMock = new AxiosClientMock(AxiosClientMock)
    dynamoDBClientMock = new DynamoDBClientMock(DynamoDBClientMock)
    envConfigMock = new EnvConfigMock(EnvConfigMock)
    spotifyClient = new SpotifyClientImpl(
      envConfigMock,
      axiosClientMock,
      dynamoDBClientMock
    )
  })

  it('getArtistByName - successfully gets artist - valid access token', () => {
    const accessTokenResult: DocumentClient.GetItemOutput = {
      Item: {
        accessToken: 'accessToken',
        expiresIn: 3600,
        issuedAt: Date.now()
      }
    }

    const expectedDbParams: DocumentClient.GetItemInput = {
      TableName: envConfigMock.spotifyTableName,
      Key: {
        id: 'AccessToken'
      }
    }

    const expectedAxiosConfig: AxiosRequestConfig = {
      baseURL: 'https://api.spotify.com/v1/',
      url: '/search?q=drake&type=artist',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer accessToken'
      },
      data: undefined
    }

    const artistResult = getSpotifyArtist()

    dynamoDBClientMock.get = jest.fn(
      () => new Promise(resolve => resolve(accessTokenResult))
    )
    axiosClientMock.get = jest.fn(
      () =>
        new Promise(resolve =>
          resolve({
            data: {
              artists: {
                items: [artistResult]
              }
            }
          })
        )
    )

    return spotifyClient
      .getArtistByName('drake')
      .then((result: SpotifyArtist) => {
        expect(dynamoDBClientMock.get).toBeCalledWith(expectedDbParams)
        expect(axiosClientMock.get).toBeCalledWith(expectedAxiosConfig)
        expect(result).toEqual(artistResult)
      })
  })
})
