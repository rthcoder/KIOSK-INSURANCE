import { Controller, Post, Body } from '@nestjs/common'
import { PayService } from './pay.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Pay Service')
@Controller({
  version: '1',
})
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Post('check-pay-card')
  payByCard(@Body() createPayDto: any) {
    return this.payService.payByCard(createPayDto)
  }

  @Post('prepare-pay-card')
  preparePay(@Body() preparePayDto: any) {
    return this.payService.payByCard(preparePayDto)
  }
}
