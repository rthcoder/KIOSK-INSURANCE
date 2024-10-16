import { Module } from '@nestjs/common'
import { CompanyService } from './insurance.service'
import { InsuranceGateService, PspModule } from 'gateRequest'
import { CompanyController } from './insurance.controller'
import { ConfigService } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [PspModule, HttpModule],
  providers: [CompanyService, ConfigService, InsuranceGateService],
  controllers: [CompanyController],
})
export class CompanyModule {}
