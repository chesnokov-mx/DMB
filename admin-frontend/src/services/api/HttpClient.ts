import axios, { AxiosInstance, AxiosResponse } from "axios";

import { ErrorResp, GetOptions, PostOptions, RequestConfig } from ".";
import { USER_TOKEN_KEY } from "@/constants";

export class HttpClient {
  private readonly api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 60_000,
    });

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: any) => {
        const config = error.config as RequestConfig;
        const response = error.response as AxiosResponse<ErrorResp>;

        if (config.ignoreCommonErrors && response?.status !== 401) {
          throw error;
        }

        if (!response) {
          return;
        }

        switch (response.status) {
          case 401:
            logout();
            break;
          case 403:
            break;
          case 404:
            break;
          default:
            let errorMessage = "";
            const error = response?.data?.error;
            if (typeof error === "string") {
              errorMessage = error;
            } else {
              errorMessage = error?.message;
              error?.data?.forEach?.((field) => {
                if (field.value === "REQUIRED") {
                  errorMessage += "\nНе указано поле " + field.key + "\n";
                } else if (
                  field.value.toUpperCase() === field.key.toUpperCase()
                ) {
                  errorMessage += "\nНе верно задано поле " + field.key + "\n";
                } else {
                  errorMessage += "\nКод: " + field.value + "\n";
                }
              });
            }
        }

        console.error("API error:", error);
        return Promise.reject(error);
      },
    );

    this.api.interceptors.request.use((config) => {
      return this.processRequestConfig(config);
    });
  }

  private processRequestConfig = (config: any) => {
    const token = localStorage.getItem(USER_TOKEN_KEY);

    if (token) {
      config.headers["X-Token"] = config.headers["X-Token"] ?? token;
    }

    return {
      ...config,
    };
  };

  async get<T>({ endpoint, params, config }: GetOptions): Promise<T> {
    try {
      const response = await this.api.get<T>(endpoint, { params, ...config });
      return response as T;
    } catch (error) {
      throw error;
    }
  }

  async post<T>({ endpoint, data, config }: PostOptions): Promise<T> {
    try {
      const response = await this.api.post<T>(endpoint, data, config);

      return response as T;
    } catch (error) {
      throw error;
    }
  }
}

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};
