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

    if (artistName) {
      const artist: SpotifyArtist = await this.spotifyClient.getArtistByName(
        artistName
      )

      const [topTrack] = await this.spotifyClient.getTopTracksByArtistId(
        artist.id
      )

      return input.responseBuilder
        .speak(
          `The number one streamed song from ${artist.name} is ${
            topTrack.name
          } and released on ${moment(topTrack.album.release_date).format(
            'MMMM d, YYYY'
          )}`
        )
        .getResponse()
    } else {
      const speakMessage = 'I was unable recognize the artist.'
      return input.responseBuilder.speak(speakMessage).getResponse()
    }
  }
}
