import { ResponseBuilder } from 'ask-sdk-core'
import { AboutHandler } from '../../src/handlers/AboutHandler'

describe('AboutHandler', () => {
  let builder
  let aboutHandler: AboutHandler

  beforeEach(() => {
    builder = jest.fn<ResponseBuilder>()
    builder.speak = jest.fn(() => builder)
    builder.getResponse = jest.fn()
    aboutHandler = new AboutHandler()
  })

  it('canHandle should return true', () => {
    const handlerInput: any = {
      requestEnvelope: {
        request: {
          type: 'IntentRequest',
          intent: {
            name: 'AboutIntent'
          }
        }
      }
    }

    expect(aboutHandler.canHandle(handlerInput)).toBeTruthy()
  })

  it('canHandle should return false', () => {
    const handlerInput: any = {
      requestEnvelope: {
        request: {
          type: 'IntentRequest',
          intent: {
            name: 'FalseIntent'
          }
        }
      }
    }

    expect(aboutHandler.canHandle(handlerInput)).toBeFalsy()
  })

  it('handle - should speak text', () => {
    const handlerInput = {
      responseBuilder: builder,
      requestEnvelope: {
        request: {
          type: 'IntentRequest',
          intent: {
            name: 'AboutIntent'
          }
        }
      }
    }

    aboutHandler.handle(handlerInput)
    expect(builder.speak).toHaveBeenCalledWith(
      'This skill was written by Alex Knipfer'
    )
  })
})
