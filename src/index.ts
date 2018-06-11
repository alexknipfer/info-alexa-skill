import * as Alexa from 'ask-sdk'
import * as dotenv from 'dotenv'
import './InversifyBinder'
import { AboutHandler } from './handlers/AboutHandler'
import { LaunchHandler } from './handlers/LaunchHandler'

dotenv.config()

const handlers = [new AboutHandler(), new LaunchHandler()]

export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(...handlers)
  .lambda()
