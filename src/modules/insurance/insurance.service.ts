import { InfinityRequestService } from 'gateRequest'
import { Injectable } from '@nestjs/common'
import { GetServiceRequest, GetStepRequest, StepOneRequest, StepTwoRequest } from '@interfaces'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { MethodList } from '@enums'

@Injectable()
export class CompanyService extends InfinityRequestService {
  // constructor(private readonly InfinityRequestService: InfinityRequestService) {
  //   super()
  // }

  // findCompany metodi
  async findCompany() {
    this.setMethod(MethodList.GET_COMPANY);
    this.setParams({});
    return this.send();
  }

  // findService metodi
  async findService(data: GetServiceRequest) {
    this.setMethod(MethodList.GET_SERVICES);
    this.setParams(data);
    return this.send();
  }

  // getStep metodi
  async getStep(data: any) {
    this.setMethod(MethodList.GET_STEP);
    this.setParams(data);
    return this.send();
  }
}
