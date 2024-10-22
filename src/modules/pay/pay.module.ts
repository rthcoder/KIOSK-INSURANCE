import { Module } from '@nestjs/common'
import { PayService } from './pay.service'
import { PayController } from './pay.controller'
import { PayGate, RequestModule } from 'gateRequest'
import { HttpModule } from '@nestjs/axios'
import { PrismaModule } from 'prisma/prisma.module'
import { ConfigService } from '@nestjs/config'
import { PayGateway } from './pay.gateway'

@Module({
  imports: [RequestModule, HttpModule, PrismaModule],
  controllers: [PayController],
  providers: [PayService, ConfigService, PayGate, PayGateway],
})
export class PayModule {}
