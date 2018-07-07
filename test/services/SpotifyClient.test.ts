import * as moment from 'moment'
import { EnvConfig } from '../../src/config/EnvConfig'
import { SpotifyClient } from '../../src/services/SpotifyClient/SpotifyClient'
import { SpotifyClientImpl } from '../../src/services/SpotifyClient/SpotifyClientImpl'
import { AxiosClient } from '../../src/services/AxiosClient/AxiosClient'
import { DynamoDBClient } from '../../src/services/DynamoDBClient/DynamoDBClient'
import { getSpotifyArtist, getSpotifyTrack } from '../testUtils'
import { SpotifyArtist } from '../../src/interfaces/spotify/SpotifyArtist'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { AxiosRequestConfig } from 'axios'
import { SpotifyTrack } from '../../src/interfaces/spotify/SpotifyTrack';

describe('SpotifyClient', () => {
  let spotifyClient: SpotifyClient
  let axiosClientMock: AxiosClient
  let dynamoDBClientMock: DynamoDBClient
  let envConfigMock: EnvConfig
  const AxiosClientMock = jest.fn<AxiosClient>()
  const DynamoDBClientMock = jest.fn<DynamoDBClient>()
  const EnvConfigMock = jest.fn<EnvConfig>(() => ({
    spotifyTableName: 'spotifyTable'
    spotifyClientId: 'spotifyClientId',
    spotifyClientSecret: 'spotifyClientSecret',
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

  it('getArtistByName - successfully gets artist - expired access token', () => {
    const accessTokenResult: DocumentClient.GetItemOutput = {
      Item: {
        accessToken: 'accessToken',
        expiresIn: 3600,
        issuedAt: moment().subtract(2, 'hours')
      }
    }

    const newAccessTokenResult = {
      data: {
        access_token: 'newAccessToken',
        expires_in: 3600,
        issuedAt: Date.now(),
      }
    }

    const tokenAxiosConfig: AxiosRequestConfig = {
      baseURL: 'https://accounts.spotify.com/api/',
      url: '/token',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic c3BvdGlmeUNsaWVudElkOnNwb3RpZnlDbGllbnRTZWNyZXQ='
      },
      data: '&grant_type=client_credentials'
    }

    const artistAxiosConfig: AxiosRequestConfig = {
      baseURL: 'https://api.spotify.com/v1/',
      url: '/search?q=drake&type=artist',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${newAccessTokenResult.data.access_token}`
      },
      data: undefined
    }

    const artistResult = getSpotifyArtist()

    dynamoDBClientMock.get = jest.fn(
      () => new Promise(resolve => resolve(accessTokenResult))
    )
    dynamoDBClientMock.put = jest.fn(
      () => new Promise(resolve => resolve())
    )
    axiosClientMock.post = jest.fn(() => new Promise(resolve => resolve(newAccessTokenResult)))
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
        expect(axiosClientMock.post).toBeCalledWith(tokenAxiosConfig)
        expect(axiosClientMock.get).toBeCalledWith(artistAxiosConfig)
        expect(result).toEqual(artistResult)
      })
  })

  it('getArtistByName - get top tracks by artist id', () => {
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
      url: '/artists/artistId/top-tracks?country=us',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer accessToken'
      },
      data: undefined
    }

    const trackResult = getSpotifyTrack()

    dynamoDBClientMock.get = jest.fn(
      () => new Promise(resolve => resolve(accessTokenResult))
    )
    axiosClientMock.get = jest.fn(
      () =>
        new Promise(resolve =>
          resolve({ data: { tracks: [trackResult] } })
        )
    )

    return spotifyClient
      .getTopTracksByArtistId('artistId')
      .then((result: SpotifyTrack[]) => {
        expect(dynamoDBClientMock.get).toBeCalledWith(expectedDbParams)
        expect(axiosClientMock.get).toBeCalledWith(expectedAxiosConfig)
        expect(result).toEqual([trackResult]);
      })
})
