import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { InsuranceService } from './insurance.service'
import {
  getServiceRequestDTO,
  getStepRequestDTO,
  StepFourRequestDto,
  stepOneRequestDTO,
  StepThreeRequestDto,
  StepTwoRequestDTO,
} from './dto'

@ApiTags('Company Service')
@Controller({
  version: '1',
})
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post('get-companies')
  async getCompany() {
    const result = await this.insuranceService.findCompany()
    return result
  }

  @Post('get-company-services')
  async getServices(@Body() getServiceDto: getServiceRequestDTO) {
    const result = await this.insuranceService.findService(getServiceDto)
    return result
  }

  @Post('get-step')
  async getStep(@Body() getStepDto: getStepRequestDTO) {
    const result = await this.insuranceService.getStep(getStepDto)
    return result
  }

  @Post('get-step-one')
  async stepOne(@Body() stepOneDto: stepOneRequestDTO) {
    const result = await this.insuranceService.getStep(stepOneDto)
    return result
  }

  @Post('get-step-two')
  async stepTwo(@Body() stepTwoDto: StepTwoRequestDTO) {
    const result = await this.insuranceService.getStep(stepTwoDto)
    return result
  }

  @Post('get-step-three')
  async stepThree(@Body() stepThreeDto: StepThreeRequestDto) {
    const result = await this.insuranceService.getStep(stepThreeDto)
    return result
  }

  @Post('get-step-four')
  async stepFour(@Body() stepFourDto: StepFourRequestDto) {
    const result = await this.insuranceService.getStep(stepFourDto)
    return result
  }

  @Post('create-invoice')
  async createInvoice(@Body() createInvoiceDto: any) {
    const result = await this.insuranceService.createInsurance(createInvoiceDto)
    return result
  }
}
