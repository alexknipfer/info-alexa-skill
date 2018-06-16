import { DynamoDBClientImpl } from '../../src/services/DynamoDBClient/DynamoDBClientImpl'
import { DynamoDBClient } from '../../src/services/DynamoDBClient/DynamoDBClient'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { DynamoDBConfig } from '../../src/config/DynamoConfig'

describe('DynamoDBClient', () => {
  let dynamoDBClient: DynamoDBClient
  const ConfigMock = jest.fn<DynamoDBConfig>()
  const DocumentClientMock = jest.fn<DocumentClient>()
  const dynamoClient = new DocumentClientMock(DocumentClientMock)

  beforeEach(() => {
    const dynamoConfig = new ConfigMock(ConfigMock)
    dynamoConfig.documentClient = dynamoClient
    dynamoDBClient = new DynamoDBClientImpl(dynamoConfig)
  })

  it('get - successfully gets item', () => {
    const expectedResult: DocumentClient.GetItemOutput = {
      Item: {
        id: 'a'
      }
    }

    const params: DocumentClient.GetItemInput = {
      TableName: 'tableName',
      Key: {
        id: 'accessToken'
      }
    }

    dynamoClient.get = jest.fn((params, cb) => {
      cb(undefined, expectedResult)
    })

    return dynamoDBClient
      .get(params)
      .then(result => {
        expect(result).toEqual(expectedResult)
      })
      .catch(error => fail('Should not get an error'))
  })

  it('get - successfully gets item - no item', () => {
    const params: DocumentClient.GetItemInput = {
      TableName: 'tableName',
      Key: {
        id: 'accessToken'
      }
    }

    dynamoClient.get = jest.fn((params, cb) => {
      cb(undefined, {})
    })

    return dynamoDBClient
      .get(params)
      .then(result => {
        expect(result).toEqual(undefined)
      })
      .catch(error => fail('Should not get an error'))
  })

  it('get - fails gets item', () => {
    dynamoClient.get = jest.fn((params, cb) => {
      cb('error', undefined)
    })

    const params: DocumentClient.GetItemInput = {
      TableName: 'tableName',
      Key: {
        id: 'accessToken'
      }
    }

    return dynamoDBClient
      .get(params)
      .then(result => {
        fail('Should error')
      })
      .catch(error => {
        expect(error).toEqual('error')
      })
  })

  it('put - successfully puts item', () => {
    dynamoClient.put = jest.fn((params, cb) => {
      cb(undefined)
    })

    const params: DocumentClient.PutItemInput = {
      TableName: 'tableName',
      Item: {
        id: 'accessToken'
      }
    }

    return dynamoDBClient
      .put(params)
      .then(result => {
        expect(result).toEqual(undefined)
      })
      .catch(error => {
        fail('Should not error')
      })
  })

  it('put - fails to put item', () => {
    dynamoClient.put = jest.fn((params, cb) => {
      cb('error')
    })

    const params: DocumentClient.PutItemInput = {
      TableName: 'tableName',
      Item: {
        id: 'accessToken'
      }
    }

    return dynamoDBClient
      .put(params)
      .then(result => {
        fail('Should not error')
      })
      .catch(error => {
        expect(error).toEqual('error')
      })
  })
})
