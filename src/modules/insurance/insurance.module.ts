import { Module } from '@nestjs/common'
import { InsuranceService } from './insurance.service'
import { InsuranceGateService, RequestModule } from 'gateRequest'
import { InsuranceController } from './insurance.controller'
import { ConfigService } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [RequestModule, HttpModule],
  providers: [InsuranceService, ConfigService, InsuranceGateService],
  controllers: [InsuranceController],
})
export class CompanyModule {}
