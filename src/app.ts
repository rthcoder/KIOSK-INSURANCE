import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { InsurancesModule, UsersModule } from '@modules'
// Import boshqa modullar

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    InsurancesModule,
  ],
  controllers: [],
  providers: [],
})
export class App {}
