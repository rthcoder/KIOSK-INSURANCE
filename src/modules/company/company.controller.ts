import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CompanyService } from './company.service'
import { getServiceRequestDTO, getStepRequestDTO, stepOneRequestDTO, StepTwoRequestDTO} from './dto'

@ApiTags('Company Service')
@Controller({
  version: '1',
})
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('get-companies')
  async getCompany() {
    return this.companyService.findCompany()
  }

  @Post('get-company-services')
  async getServices(@Body() getServiceDto: getServiceRequestDTO) {
    return this.companyService.findService(getServiceDto)
  }

  @Post('get-step')
  async getStep(@Body() getStepDto: getStepRequestDTO) {
    return this.companyService.getStep(getStepDto)
  }

  @Post('get-step-one')
  async stepOne(@Body() stepOneDto: stepOneRequestDTO) {
    return this.companyService.stepOne(stepOneDto)
  }

  @Post('get-step-two')
  async stepTwo(@Body() stepTwoDto: StepTwoRequestDTO) {
    return this.companyService.stepTwo(stepTwoDto)
  }
}
