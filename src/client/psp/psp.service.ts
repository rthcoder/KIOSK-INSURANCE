import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { createAuthHeader } from '@helpers'
import { MethodList } from '@enums'


@Injectable()
export class PspService {
  #_token: string

  readonly #_axios: AxiosInstance

  constructor(config: ConfigService) {
    this.#_axios = axios.create({
      baseURL: config.getOrThrow<string>('psp.url'),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': createAuthHeader(config.getOrThrow<string>('psp.serviceId'), config.getOrThrow<string>('psp.serviceKey'))
      },
    })

    this.#_axios.interceptors.request.use(this.#_requestFulfilled.bind(this), this.#_requestRejected.bind(this))
    this.#_axios.interceptors.response.use(this.#_responseFulfilled.bind(this), this.#_responseRejected.bind(this))
  }

  async getCompany () {
    const response = await this.#_axios.request({
      method: 'GET',
      params: {
        method: MethodList.GET_COMPANY
      }
    })

    console.log(response);
    return response
  }

  #_requestFulfilled(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    if (this.#_token) {
      config.headers.set('Authorization', `Bearer ${this.#_token}`)
    }

    return config
  }

  #_requestRejected(error: unknown): Promise<never> {
    return Promise.reject(error)
  }

  #_responseFulfilled(response: AxiosResponse): AxiosResponse {
    if (response.data.error) {
      throw new BadRequestException(response.data.error.message)
    }

    return response
  }

  async #_responseRejected(error: unknown): Promise<AxiosResponse> {
    console.log('psp error:', error)

    if (axios.isCancel(error)) {
      throw new RequestTimeoutException(error.message)
    }

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw error.response?.status === HttpStatus.UNAUTHORIZED
          ? new UnauthorizedException(error.response.data)
          : new ForbiddenException(error.response.data)
      }

      // console.log('Error:', {
      //   status: error.response.status,
      //   message: error.response.statusText,
      //   details: error.response.data,
      //   exception: error.name,
      // })

      // throw new HttpException(error.response.data, error.response.status, {
      //   cause: {
      //     status: error.response?.status ?? 500,
      //     message: error.response?.statusText ?? 'Internal Server Error',
      //     details: error.response?.data,
      //     exception: error.name,
      //   },
      // })
    }

    throw new InternalServerErrorException(error)
  }
}
