import { Injectable } from '@nestjs/common'
import { InfinityRequestService } from './request.service'
import { MethodList } from '@enums'
import { GetServiceRequest } from '@interfaces'

@Injectable()
export class InsuranceGateService extends InfinityRequestService {
  // findCompany metodi
  async findCompany(serviceId: string, serviceKey: string) {
    return this.setServiceId(serviceId).setServiceKey(serviceKey).setMethod(MethodList.GET_COMPANY).setParams({}).send()
  }

  // findService metodi
  async findService(data: GetServiceRequest) {
    this.setMethod(MethodList.GET_SERVICES)
    this.setParams(data)
    return this.send()
  }

  // getStep metodi
  async getStep(data: any) {
    this.setMethod(MethodList.GET_STEP)
    this.setParams(data)
    return this.send()
  }
}
