import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export interface DynamoDBClient {
  /**
   * Gets an item from DynamoDB table
   * @param params Item to get from DynamoDB table
   */
  get(
    params: DocumentClient.GetItemInput
  ): Promise<DocumentClient.GetItemOutput | undefined>

  /**
   * Puts an item into DynamoDB table
   * @param params Item to put into DynamoDB table
   */
  put(params: DocumentClient.PutItemInput): Promise<void>
}
