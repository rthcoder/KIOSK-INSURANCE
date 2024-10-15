import { InfinityRequestService, InsuranceGateService } from 'gateRequest'
import { Injectable } from '@nestjs/common'
import { GetServiceRequest, GetStepRequest, StepOneRequest, StepTwoRequest } from '@interfaces'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { MethodList } from '@enums'

@Injectable()
export class CompanyService {
  constructor(private readonly insuranceGateService: InsuranceGateService) {}

  // findCompany metodi
  async findCompany() {
    const result = await this.insuranceGateService.findCompany(process.env.PSP_SERVICE_ID, process.env.PSP_SERVICE_KEY)
    return result.getResponse()
  }

  // // findService metodi
  // async findService(data: GetServiceRequest) {
  //   const result = await this.insuranceGateService.findCompany()
  //   return result.getResponse()
  // }

  // // getStep metodi
  // async getStep(data: any) {
  //   const result = await this.insuranceGateService.findCompany()
  //   return result.getResponse()
  // }
}
