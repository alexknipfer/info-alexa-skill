import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { AxiosClient } from '../../src/services/AxiosClient/AxiosClient'
import { AxiosClientImpl } from '../../src/services/AxiosClient/AxiosClientImpl'

jest.mock('axios')

describe('AxiosClientImpl', () => {
  let axiosClient: AxiosClient

  beforeEach(() => {
    axiosClient = new AxiosClientImpl()
  })

  it('post - axios post success', () => {
    const config: AxiosRequestConfig = {
      url: 'url',
      method: 'post',
      headers: { test: 'testHeader' },
      data: { test: 'testData' }
    }

    const expectedResponse: AxiosResponse = {
      data: { testData: 'test data' },
      status: 200,
      statusText: 'statusText',
      headers: 'headers',
      config
    }

    require('axios').request = jest.fn(
      () => new Promise(resolve => resolve(expectedResponse))
    )

    axiosClient.post(config).then(result => {
      expect(require('axios').request).toBeCalledWith(config)
      expect(result).toEqual(expectedResponse)
    })
  })

  it('post - axios post fails', () => {
    const config: AxiosRequestConfig = {
      url: 'url',
      method: 'post',
      headers: { test: 'testHeader' },
      data: { test: 'testData' }
    }

    const expectedError: AxiosError = {
      name: 'errorName',
      message: 'errorMessage',
      config,
      code: 'errorCode'
    }

    require('axios').request = jest.fn(
      () => new Promise((resolve, reject) => reject(expectedError))
    )

    axiosClient
      .post(config)
      .then(result => {
        fail('should not succeed')
      })
      .catch((err: any) => {
        expect(err).toEqual(expectedError)
      })
  })

  it('post - axios get success', () => {
    const config: AxiosRequestConfig = {
      url: 'url',
      method: 'get',
      headers: { test: 'testHeader' }
    }

    const expectedResponse: AxiosResponse = {
      data: { testData: 'test data' },
      status: 200,
      statusText: 'statusText',
      headers: 'headers',
      config
    }

    require('axios').request = jest.fn(
      () => new Promise(resolve => resolve(expectedResponse))
    )

    axiosClient.get(config).then(result => {
      expect(require('axios').request).toBeCalledWith(config)
      expect(result).toEqual(expectedResponse)
    })
  })

  it('post - axios get fails', () => {
    const config: AxiosRequestConfig = {
      url: 'url',
      method: 'get',
      headers: { test: 'testHeader' }
    }

    const expectedError: AxiosError = {
      name: 'errorName',
      message: 'errorMessage',
      config,
      code: 'errorCode'
    }

    require('axios').request = jest.fn(
      () => new Promise((resolve, reject) => reject(expectedError))
    )

    axiosClient
      .get(config)
      .then(result => {
        fail('should not succeed')
      })
      .catch((err: any) => {
        expect(err).toEqual(expectedError)
      })
  })
})
