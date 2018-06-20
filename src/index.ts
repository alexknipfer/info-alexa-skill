import * as Alexa from 'ask-sdk'
import * as dotenv from 'dotenv'
import './InversifyBinder'
import { InversifyConfiguration, InversifyTypes } from './inversify.config'
import { AboutHandler } from './handlers/AboutHandler'
import { LaunchHandler } from './handlers/LaunchHandler'
import { ArtistTopTrackHandler } from './handlers/ArtistTopTrackHandler'

dotenv.config()

export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    InversifyConfiguration.container.get<AboutHandler>(
      InversifyTypes.AboutHandler
    ),
    InversifyConfiguration.container.get<LaunchHandler>(
      InversifyTypes.LaunchHandler
    ),
    InversifyConfiguration.container.get<ArtistTopTrackHandler>(
      InversifyTypes.ArtistTopTrackHandler
    )
  )
  .lambda()
