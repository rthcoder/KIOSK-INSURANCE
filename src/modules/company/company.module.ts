import { Module } from '@nestjs/common'
import { CompanyService } from './company.service'
import { PspModule } from 'integration'
import { CompanyController } from './company.controller'

@Module({
  imports: [PspModule],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
