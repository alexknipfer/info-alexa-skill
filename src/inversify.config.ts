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
  EnvConfig: Symbol('EnvConfig'),
  AxiosClient: Symbol('AxiosClient'),
  SpotifyClient: Symbol('SpotifyClient'),
  DynamoDBClient: Symbol('DynamoDBClient'),
  DynamoConfig: Symbol('DynamoConfig')
}
