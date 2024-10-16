import { InsuranceGateService } from 'gateRequest'
import { Injectable } from '@nestjs/common'
import { GetServiceRequest, GetStepRequest } from '@interfaces'

@Injectable()
export class InsuranceService {
  constructor(private readonly insuranceGateService: InsuranceGateService) {}

  async findCompany() {
    const result = await this.insuranceGateService.findCompany(process.env.PSP_SERVICE_ID, process.env.PSP_SERVICE_KEY)
    return result.getResult()
  }

  async findService(data: GetServiceRequest) {
    const result = await this.insuranceGateService.findService(
      data,
      process.env.PSP_SERVICE_ID,
      process.env.PSP_SERVICE_KEY,
    )
    return result.getResult()
  }

  // getStep metodi
  async getStep(data: GetStepRequest) {
    const result = await this.insuranceGateService.getStep(
      data,
      process.env.PSP_SERVICE_ID,
      process.env.PSP_SERVICE_KEY,
    )
    return result.getResponse()
  }

  //create insurance yani invoice olish metodi
  async createInsurance(data: any) {
    const result = await this.insuranceGateService.createInsurance(
      data,
      process.env.PSP_SERVICE_ID,
      process.env.PSP_SERVICE_KEY,
    )
    return result.getResponse()
  }
}
