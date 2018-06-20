import { RequestHandler, HandlerInput } from 'ask-sdk'
import { inject } from 'inversify'
import { RequestTypes, IntentTypes } from '../lib/contants'
import { IntentRequest, Response } from 'ask-sdk-model'
import { InversifyTypes } from '../inversify.config'
import { SpotifyArtist } from '../interfaces/spotify/SpotifyArtist'

export class ArtistTopTrackHandler implements RequestHandler {
  constructor(
    @inject(InversifyTypes.SpotifyClient) private spotifyClient: any
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

    if (intentRequest.intent.slots) {
      const artist: SpotifyArtist = await this.spotifyClient.getArtistByName(
        artistName
      )
      // TODO - Lookup top tracks by artist id
      return input.responseBuilder
        .speak(`Artist name is ${artist.name}`)
        .getResponse()
    } else {
      const speakMessage = 'I was unable recognize the artist.'
      return input.responseBuilder.speak(speakMessage).getResponse()
    }
  }
}
