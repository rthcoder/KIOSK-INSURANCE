import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { RequestModule } from 'gateRequest'
import {
  UsersModule,
  CompanyModule,
  PayModule,
  BankModule,
  RegionModule,
  DepositModule,
  PartnerModule,
  StructureModule,
} from '@modules'
import { pspConfig } from '@config'
import { AuthModule } from 'auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [pspConfig],
    }),
    PrismaModule,
    RequestModule,
    UsersModule,
    CompanyModule,
    PayModule,
    AuthModule,
    BankModule,
    RegionModule,
    PartnerModule,
    StructureModule,
    DepositModule,
  ],
  controllers: [],
  providers: [],
})
export class App {}
