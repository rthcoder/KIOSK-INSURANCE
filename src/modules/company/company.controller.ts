import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CompanyService } from './company.service'

@ApiTags('Company Service')
@Controller({
  path: 'companies',
  version: '1',
})
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getCompany() {
    return this.companyService.findAll()
  }
}
