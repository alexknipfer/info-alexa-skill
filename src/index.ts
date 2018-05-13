import * as Alexa from 'alexa-sdk'

let handlers: Alexa.Handlers<Alexa.IntentRequest> = {
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

export default (
  event: Alexa.RequestBody<Alexa.Request>,
  context: Alexa.Context,
  callback: Function
) => new Handler(event, context, callback)
