import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { PspModule } from 'gateRequest'
import {  UsersModule, CompanyModule } from '@modules'
import { pspConfig } from '@config'
// Import boshqa modullar

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [pspConfig],
    }),
    PrismaModule,
    PspModule,
    UsersModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [],
})
export class App {}
