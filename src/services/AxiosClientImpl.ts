import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export class AxiosClientImpl {
  public post(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.doRequest('post', config)
  }

  private doRequest(
    method: string,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    config = { ...config, method }

    try {
      return axios.request(config)
    } catch (error) {
      throw error
    }
  }
}
