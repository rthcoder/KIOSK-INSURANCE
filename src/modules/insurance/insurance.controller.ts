import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CompanyService } from './insurance.service'
import { getServiceRequestDTO, getStepRequestDTO, stepOneRequestDTO, StepTwoRequestDTO } from './dto'

@ApiTags('Company Service')
@Controller({
  version: '1',
})
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('get-companies')
  async getCompany() {
    const result = await this.companyService.findCompany()
    return result
  }

  // @Post('get-company-services')
  // async getServices(@Body() getServiceDto: getServiceRequestDTO) {
  //   const result = await this.companyService.findService(getServiceDto)
  //   return  result.getResult()
  // }

  // @Post('get-step')
  // async getStep(@Body() getStepDto: getStepRequestDTO) {
  //   return (await this.companyService.getStep(getStepDto)).getResponse()
  // }

  // @Post('get-step-one')
  // async stepOne(@Body() stepOneDto: stepOneRequestDTO) {
  //   return (await this.companyService.getStep(stepOneDto)).getResponse()
  // }

  // @Post('get-step-two')
  // async stepTwo(@Body() stepTwoDto: StepTwoRequestDTO) {
  //   return (await this.companyService.getStep(stepTwoDto)).getResponse()
  // }
}
