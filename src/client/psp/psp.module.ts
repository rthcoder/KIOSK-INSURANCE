import { Module } from '@nestjs/common'
import { PspService } from './psp.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  providers: [PspService],
  exports: [PspService],
})
export class PspModule {}
