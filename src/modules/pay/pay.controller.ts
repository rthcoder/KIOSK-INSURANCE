import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PayService } from './pay.service'
import { CreatePayDto } from './dto/create-pay.dto'
import { UpdatePayDto } from './dto/update-pay.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Pay Service')
@Controller({
  version: '1',
})
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Post('check-pay-card')
  payByCard(@Body() createPayDto: any) {
    console.log(createPayDto)
    return this.payService.payByCard(createPayDto)
  }

  @Post('prepare-pay-card')
  preparePay(@Body() preparePayDto: any) {
    console.log(preparePayDto)
    return this.payService.payByCard(preparePayDto)
  }
}
