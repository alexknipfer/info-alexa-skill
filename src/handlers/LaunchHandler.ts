import { HandlerInput, RequestHandler } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import { RequestTypes } from '../lib/contants'

export class LaunchHandler implements RequestHandler {
  public canHandle(input: HandlerInput): boolean {
    return input.requestEnvelope.request.type === RequestTypes.Launch
  }

  public handle(input: HandlerInput): Response {
    const speakText = 'You have reached the launch request, how may I help you?'
    return input.responseBuilder
      .speak(speakText)
      .reprompt(speakText)
      .getResponse()
  }
}
