import * as moment from 'moment'
import { RequestHandler, HandlerInput } from 'ask-sdk'
import { inject } from 'inversify'
import { RequestTypes, IntentTypes } from '../lib/contants'
import { IntentRequest, Response } from 'ask-sdk-model'
import { InversifyTypes } from '../inversify.config'
import { SpotifyArtist } from '../interfaces/spotify/SpotifyArtist'
import { SpotifyClient } from '../services/SpotifyClient/SpotifyClient'

export class ArtistTopTrackHandler implements RequestHandler {
  constructor(
    @inject(InversifyTypes.SpotifyClient) private spotifyClient: SpotifyClient
  ) {}

  public canHandle(input: HandlerInput): boolean {
    return (
      input.requestEnvelope.request.type === RequestTypes.Intent &&
      input.requestEnvelope.request.intent.name === IntentTypes.ArtistTopTrack
    )
  }

  public async handle(input: HandlerInput): Promise<Response> {
    const intentRequest = input.requestEnvelope.request as IntentRequest

    const artistName = intentRequest.intent.slots
      ? intentRequest.intent.slots['artistName'].value
      : undefined

    if (!artistName) {
      return input.responseBuilder
        .speak('I was unable to recognize the artist.')
        .getResponse()
    }

    const artist: SpotifyArtist = await this.spotifyClient.getArtistByName(
      artistName
    )

    if (!artist) {
      return input.responseBuilder
        .speak(`I was unable to find the artist ${artistName}`)
        .getResponse()
    }

    const [topTrack] = await this.spotifyClient.getTopTracksByArtistId(
      artist.id
    )

    const text = topTrack
      ? `The number one streamed song from ${artist.name} is ${
          topTrack.name
        } and released on ${moment(topTrack.album.release_date).format(
          'MMMM d, YYYY'
        )}`
      : `I was unable to find a top track for ${artist.name}`

    return input.responseBuilder.speak(text).getResponse()
  }
}
