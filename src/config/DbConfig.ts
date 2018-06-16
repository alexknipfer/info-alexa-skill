import { DocumentClient } from 'aws-sdk/clients/dynamodb'
export class DbConfig {
  public documentClient: DocumentClient

  constructor() {
    this.documentClient = new DocumentClient()
  }
}
