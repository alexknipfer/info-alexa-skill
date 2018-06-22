import * as moment from 'moment'
import { ResponseBuilder } from 'ask-sdk-core'
import { ArtistTopTrackHandler } from '../../src/handlers/ArtistTopTrackHandler'
import { IntentTypes } from '../../src/lib/contants'
import { SpotifyClient } from '../../src/services/SpotifyClient/SpotifyClient'
import { getSpotifyArtist, getSpotifyTrack } from '../testUtils'

describe('AboutHandler', () => {
  const SpotifyClientMock = jest.fn<SpotifyClient>()
  let builder
  let artistTopTrackHandler: ArtistTopTrackHandler
  let spotifyClientMock: SpotifyClient

  beforeEach(() => {
    builder = jest.fn<ResponseBuilder>()
    builder.speak = jest.fn(() => builder)
    builder.getResponse = jest.fn()
    spotifyClientMock = new SpotifyClientMock(SpotifyClientMock)
    artistTopTrackHandler = new ArtistTopTrackHandler(spotifyClientMock)
  })

  it('handle - should speak text', () => {
    const handlerInput = {
      responseBuilder: builder,
      requestEnvelope: {
        request: {
          type: 'IntentRequest',
          intent: {
            name: IntentTypes.ArtistTopTrack,
            slots: {
              artistName: {
                value: 'drake'
              }
            }
          }
        }
      }
    }

    const expectedArtist = getSpotifyArtist()
    const expectedTrack = getSpotifyTrack()

    spotifyClientMock.getArtistByName = jest.fn(
      () => new Promise(resolve => resolve(expectedArtist))
    )
    spotifyClientMock.getTopTracksByArtistId = jest.fn(
      () => new Promise(resolve => resolve([expectedTrack]))
    )

    const expectedSpeakString = `The number one streamed song from ${
      expectedArtist.name
    } is ${expectedTrack.name} and released on ${moment(
      expectedTrack.album.release_date
    ).format('MMMM d, YYYY')}`

    return artistTopTrackHandler.handle(handlerInput as any).then(() => {
      expect(spotifyClientMock.getArtistByName).toBeCalledWith('drake')
      expect(spotifyClientMock.getTopTracksByArtistId).toBeCalledWith(
        expectedArtist.id
      )
      expect(builder.speak).toHaveBeenCalledWith(expectedSpeakString)
    })
  })
})
