import { LaunchHandler } from '../../src/handlers/LaunchHandler'
import { ResponseBuilder } from 'ask-sdk-core'
import { RequestTypes, IntentTypes } from '../../src/lib/contants'

describe('LaunchHandler', () => {
  let builder
  let launchHandler: LaunchHandler

  beforeEach(() => {
    builder = jest.fn<ResponseBuilder>()
    builder.speak = jest.fn(() => builder)
    builder.reprompt = jest.fn(() => builder)
    builder.getResponse = jest.fn()
    launchHandler = new LaunchHandler()
  })

  it('canHandle should return true', () => {
    const handlerInput: any = {
      requestEnvelope: {
        request: {
          type: RequestTypes.Launch
        }
      }
    }
    expect(launchHandler.canHandle(handlerInput)).toBeTruthy()
  })

  it('canHandle should return false', () => {
    const handlerInput: any = {
      requestEnvelope: {
        request: {
          type: 'Invalid request type'
        }
      }
    }
    expect(launchHandler.canHandle(handlerInput)).toBeFalsy()
  })

  it('handle - should speak launch text', () => {
    const handlerInput = {
      responseBuilder: builder,
      requestEnvelope: {
        request: {
          type: RequestTypes.Launch
        }
      }
    }

    launchHandler.handle(handlerInput as any)

    const expectedSpeakText =
      'Welcome to the spotify skill, how may I help you?'
    expect(builder.speak).toHaveBeenCalledWith(expectedSpeakText)
    expect(builder.reprompt).toHaveBeenCalledWith(expectedSpeakText)
    expect(builder.getResponse).toHaveBeenCalled()
  })
})
