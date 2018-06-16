import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { AWSError } from 'aws-sdk/lib/error'
import { DynamoDBClient } from './DynamoDBClient'
import { inject } from 'inversify'
import { DbConfig } from '../../config/DbConfig'
import { InversifyTypes } from '../../inversify.config'

export class DynamoDBClientImpl implements DynamoDBClient {
  private dynamoClient: DocumentClient

  constructor(@inject(InversifyTypes.DynamoConfig) dbConfig: DbConfig) {
    this.dynamoClient = dbConfig.documentClient
  }

  public async get(
    params: DocumentClient.GetItemInput
  ): Promise<DocumentClient.GetItemOutput | undefined> {
    return new Promise((resolve, reject) => {
      this.dynamoClient.get(
        params,
        (err: AWSError, data: DocumentClient.GetItemOutput) => {
          if (err) {
            reject(err)
          } else {
            if (data && data.Item) {
              resolve(data)
            } else {
              resolve()
            }
          }
        }
      )
    })
  }

  public async put(params: DocumentClient.PutItemInput): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.dynamoClient.put(params, (err: AWSError) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}
