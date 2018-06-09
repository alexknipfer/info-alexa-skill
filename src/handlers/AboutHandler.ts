import { HandlerInput, RequestHandler } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import { RequestTypes, IntentTypes } from '../lib/contants'

export class AboutHandler implements RequestHandler {
  public canHandle(input: HandlerInput): boolean {
    return (
      input.requestEnvelope.request.type === RequestTypes.Intent &&
      input.requestEnvelope.request.intent.name === IntentTypes.About
    )
  }

  public handle(input: HandlerInput): Response {
    const speakText = 'This skill was written by Alex Knipfer'
    return input.responseBuilder.speak(speakText).getResponse()
  }
}
