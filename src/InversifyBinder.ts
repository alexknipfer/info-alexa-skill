import { InversifyConfiguration, InversifyTypes } from './inversify.config'
import { AxiosClientImpl } from './services/AxiosClient/AxiosClientImpl'
import { SpotifyClientImpl } from './services/SpotifyClient/SpotifyClientImpl'
import { DynamoDBClientImpl } from './services/DynamoDBClient/DynamoDBClientImpl'
import { EnvConfig } from './config/EnvConfig'
import { DbConfig } from './config/DbConfig'
import { ArtistTopTrackHandler } from './handlers/ArtistTopTrackHandler'
import { AboutHandler } from './handlers/AboutHandler'
import { LaunchHandler } from './handlers/LaunchHandler'

// Handlers
InversifyConfiguration.decorateAndBind(
  InversifyTypes.ArtistTopTrackHandler,
  ArtistTopTrackHandler
)
InversifyConfiguration.decorateAndBind(
  InversifyTypes.AboutHandler,
  AboutHandler
)
InversifyConfiguration.decorateAndBind(
  InversifyTypes.LaunchHandler,
  LaunchHandler
)

// Config
InversifyConfiguration.decorateAndBind(InversifyTypes.EnvConfig, EnvConfig)
InversifyConfiguration.decorateAndBind(InversifyTypes.DynamoConfig, DbConfig)

// Services
InversifyConfiguration.decorateAndBind(
  InversifyTypes.AxiosClient,
  AxiosClientImpl
)

InversifyConfiguration.decorateAndBind(
  InversifyTypes.SpotifyClient,
  SpotifyClientImpl
)

InversifyConfiguration.decorateAndBind(
  InversifyTypes.DynamoDBClient,
  DynamoDBClientImpl
)
