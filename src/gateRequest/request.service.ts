import { Injectable, HttpException, InternalServerErrorException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import * as crypto from 'crypto'
import { REQUEST_ERRORS } from '@enums'
import { GetInsuranceIds } from '@interfaces'

@Injectable()
export class InfinityRequestService {
  private response: any
  private method: string
  private params: any
  private errorUnknown: any
  private serviceKey: string
  private serviceId: string
  private url: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // So'rovni yuborish
  async send() {
    const jsonPayload = this.getRequest()

    console.log(jsonPayload)

    const url = this.getUrl()
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

  setUrl(params: string): InfinityRequestService {
    this.url = params
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

  getUrl(): any {
    return this.url || ''
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

  // {
  //   id: 146,
  //   order_id: 'fd2ef155-4b04-4eef-959d-3fd45da65153',
  //   anketa_id: '901525',
  //   polis_id: 146,
  //   pay: {
  //     endpoint_url: 'https://agr.uz/gateway',
  //     protocol: 'json-rpc',
  //     params: { vendor_id: 105458, anketa_id: '901525' },
  //     methods: [
  //       'pam.pay_by_cash',
  //       'pam.prepare_pay',
  //       'pam.prepare_pay_by_id',
  //       'pam.pay_by_id'
  //     ]
  //   }
  // }

  getInsuranceIds(): GetInsuranceIds {
    const result = {
      order_id: this?.response?.result?.order_id,
      anketa_id: this?.response?.result?.anketa_id,
      polis_id: this?.response?.result?.polis_id,
      vendor_id: this?.response?.result?.pay?.params?.vendor_id,
    }
    return result
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
