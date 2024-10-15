import { PspService } from 'integration'
import { Injectable } from '@nestjs/common'
import { GetServiceRequest, GetStepRequest, StepOneRequest, StepTwoRequest } from '@interfaces'

@Injectable()
export class CompanyService {
  constructor(private readonly pspService: PspService) {}

  async findCompany() {
    const companies = this.pspService.getCompany()
    return companies
  }

  async findService(data: GetServiceRequest) {
    const services = this.pspService.getService(data.company_id)
    return services
  }

  async getStep(data: GetStepRequest) {
    const stepResult = this.pspService.getStep(data)
    return stepResult
  }

  async stepOne(data: StepOneRequest){
    const stepOneResult = this.pspService.stepOne(data)
    return stepOneResult
  }

  async stepTwo(data: StepTwoRequest){
    const stepTwoResult = this.pspService.stepTwo(data)
    return stepTwoResult
  }
}
