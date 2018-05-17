import * as Alexa from 'alexa-sdk'

let handlers: Alexa.Handlers<Alexa.IntentRequest> = {
  LaunchRequest: function() {
    let self: Alexa.Handler<Alexa.LaunchRequest> = this
    self.emit(
      ':ask',
      'You have reached the launch request, how may I help you?'
    )
  },
  AboutIntent: function() {
    let self: Alexa.Handler<Alexa.IntentRequest> = this
    let speechOutput = 'This skill was written by Alex Knipfer'
    self.emit(':tellWithCard', speechOutput, "Alex's skill", speechOutput)
  }
}

export class Handler {
  constructor(
    event: Alexa.RequestBody<Alexa.Request>,
    context: Alexa.Context,
    callback: Function
  ) {
    let alexa = Alexa.handler(event, context)
    alexa.appId = 'test_id'
    alexa.registerHandlers(handlers)
    alexa.execute()
  }
}

export const handler = (
  event: Alexa.RequestBody<Alexa.Request>,
  context: Alexa.Context,
  callback: Function
) => new Handler(event, context, callback)
