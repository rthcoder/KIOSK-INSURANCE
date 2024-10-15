import { PspService } from '@client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  constructor(
    private readonly pspService: PspService,
  ){}

  async findAll () {
    const companies = this.pspService.getCompany()
    return companies
  }
}
