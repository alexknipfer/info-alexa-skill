import * as Alexa from 'ask-sdk'
import * as dotenv from 'dotenv'
import './InversifyBinder'
import { AboutHandler } from './handlers/AboutHandler'
import { LaunchHandler } from './handlers/LaunchHandler'

dotenv.config()

export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(new AboutHandler(), new LaunchHandler())
  .lambda()
