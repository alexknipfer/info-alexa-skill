import 'reflect-metadata'
import { Container, injectable, decorate } from 'inversify'

export class InversifyConfiguration {
  public static container = new Container()

  public static decorateAndBind<InterfaceType>(type: symbol, classToBind: any) {
    decorate(injectable(), classToBind)
    this.container
      .bind<InterfaceType>(type)
      .to(classToBind)
      .inSingletonScope()
  }
}

export const InversifyTypes = {
  // Handlers
  ArtistTopTrackHandler: Symbol('ArtistTopTrackHandler'),
  AboutHandler: Symbol('AboutHandler'),
  LaunchHandler: Symbol('LaunchHandler'),

  // Config
  EnvConfig: Symbol('EnvConfig'),
  DynamoConfig: Symbol('DynamoConfig'),

  // Services
  AxiosClient: Symbol('AxiosClient'),
  SpotifyClient: Symbol('SpotifyClient'),
  DynamoDBClient: Symbol('DynamoDBClient')
}
