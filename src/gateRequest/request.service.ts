import { Injectable, HttpException, InternalServerErrorException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import * as crypto from 'crypto'
import { REQUEST_ERRORS } from '@enums'

@Injectable()
export class InfinityRequestService {
  private response: any
  private method: string
  private params: any
  private errorUnknown: any
  private serviceKey: string
  private serviceId: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // So'rovni yuborish
  async send() {
    const jsonPayload = this.getRequest()

    const url = this.configService.get<string>('insurance.url')
    const authHeader = this.generateForAuth()

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, jsonPayload, {
          headers: {
            'Content-Type': 'application/json',
            'Auth': authHeader,
          },
          timeout: 30000,
        }),
      )

      console.log(response)
      console.log(jsonPayload.params)

      this.response = response.data

      if (!this.response) {
        this.setErrorUnknown({
          code: REQUEST_ERRORS.INVALID_ANSWER,
          message: REQUEST_ERRORS.UNKNOWN_RESPONSE_ERROR,
        })
      }

      return this
    } catch (error: any) {
      if (error.response) {
        throw new HttpException(`AXIOS request failed: ${error.message}`, error.response.status)
      } else {
        throw new InternalServerErrorException('AXIOS request failed: ' + error.message)
      }
    }
  }

  // Parametrlarni set qilish
  setParams(params: any): InfinityRequestService {
    this.params = params
    return this
  }

  setServiceKey(params: string): InfinityRequestService {
    this.serviceKey = params
    return this
  }

  setServiceId(params: string): InfinityRequestService {
    this.serviceId = params
    return this
  }

  // Javobni saqlash
  setResponse(response: any): InfinityRequestService {
    this.response = response
    return this
  }

  // Xato haqida ma'lumot berish
  setErrorUnknown(error: any) {
    this.errorUnknown = error
  }

  getParams(): any {
    return this.params || {}
  }

  setMethod(method: string): InfinityRequestService {
    this.method = method
    return this
  }

  getMethod(): string {
    return this.method || null
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000)
  }

  // Authorization header generatsiya qilish
  private generateForAuth(): string {
    const timestamp = Date.now()

    const hash = crypto
      .createHash('sha1')
      .update(this.serviceKey + timestamp)
      .digest('hex')

    const authHeader = `${this.serviceId}-${hash}-${timestamp}`

    return authHeader
  }

  getResponse(): any {
    return this.response || {}
  }

  getResult(): any {
    return this.response?.result || []
  }

  getError(): any {
    return this.response?.error || this.errorUnknown
  }

  getErrorUnknown(): any {
    return this.errorUnknown || { message: 'Unknown error' }
  }

  isOk(): boolean {
    return !this.getError()
  }

  // getResultSms(): any {
  //   const confirmSms = this.getResult()?.confirm_form || [];
  //   return confirmSms.find(item => item.key === 'transaction_id')?.value || null;
  // }

  // getResultCheckPay(): any {
  //   const result = this.getResult() || [];
  //   return result.find(item => item.request_method === 'pam.prepare_pay') || null;
  // }

  getDetails(): any {
    return this.response?.result?.details || []
  }

  // So'rov tayyorlash
  getRequest(): any {
    return {
      jsonrpc: '2.0',
      id: this.generateId(),
      method: this.getMethod(),
      params: this.getParams(),
    }
  }
}
