import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { RequestModule } from 'gateRequest'
import { UsersModule, CompanyModule, PayModule } from '@modules'
import { pspConfig } from '@config'
// Import boshqa modullar

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
  ],
  controllers: [],
  providers: [],
})
export class App {}
