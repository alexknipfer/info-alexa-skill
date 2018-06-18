import { InversifyConfiguration, InversifyTypes } from './inversify.config'
import { AxiosClientImpl } from './services/AxiosClient/AxiosClientImpl'
import { SpotifyClientImpl } from './services/SpotifyClientImpl'
import { DynamoDBClientImpl } from './services/DynamoDBClient/DynamoDBClientImpl'
import { EnvConfig } from './config/EnvConfig'
import { DbConfig } from './config/DbConfig'

InversifyConfiguration.decorateAndBind(InversifyTypes.EnvConfig, EnvConfig)

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

InversifyConfiguration.decorateAndBind(InversifyTypes.DynamoConfig, DbConfig)
