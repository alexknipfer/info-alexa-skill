import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface AxiosClient {
  /**
   * Performs a post request using axios
   * @param config Axios config object
   */
  post(config: AxiosRequestConfig): Promise<AxiosResponse>
}
