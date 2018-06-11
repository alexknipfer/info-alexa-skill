import { InversifyConfiguration } from './inversify.config'
import { InversifyTypes } from './models/InversifyTypes'
import { AxiosClientImpl } from './services/AxiosClient/AxiosClientImpl'
import { SpotifyClientImpl } from './services/SpotifyClientImpl'

InversifyConfiguration.decorateAndBind(
  InversifyTypes.AxiosClient,
  AxiosClientImpl
)

InversifyConfiguration.decorateAndBind(
  InversifyTypes.SpotifyClient,
  SpotifyClientImpl
)
