import { AxiosRequestConfig } from 'axios'

export interface ErrorResp {
  error:
    | {
        code: string
        data?: { key: string; value: string }[]
        message: string
      }
    | string
}

export type RequestConfig = AxiosRequestConfig & {
  ignoreCommonErrors?: boolean
}

export type GetOptions = {
  endpoint: string
  params?: any
  config?: RequestConfig
}

export type PostOptions = {
  endpoint: string
  data?: any
  config?: RequestConfig
}
