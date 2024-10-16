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
  async findService(data: GetServiceRequest, serviceId: string, serviceKey: string) {
    return this.setServiceId(serviceId)
      .setServiceKey(serviceKey)
      .setMethod(MethodList.GET_SERVICES)
      .setParams(data)
      .send()
  }

  // getStep metodi
  async getStep(data: any, serviceId: string, serviceKey: string) {
    return this.setServiceId(serviceId).setServiceKey(serviceKey).setMethod(MethodList.GET_STEP).setParams(data).send()
  }

  async createInsurance(data: any, serviceId: string, serviceKey: string) {
    return this.setServiceId(serviceId)
      .setServiceKey(serviceKey)
      .setMethod(MethodList.CREATE_INSURANCE)
      .setParams(data)
      .send()
  }
}
