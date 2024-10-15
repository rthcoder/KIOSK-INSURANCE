import { Module } from '@nestjs/common';
import { PspService } from './psp.service';

@Module({
  providers: [PspService],
  exports: [PspService]
})
export class PspModule {}
