import { Injectable } from '@nestjs/common'
import { PayGate } from 'gateRequest'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class PayService {
  constructor(
    private readonly payGateService: PayGate,
    private readonly prisma: PrismaService,
  ) {}

  async payByCard(data: any) {
    const result = await this.payGateService.payByCard(
      process.env.QUICKPAY_SERVICE_ID,
      process.env.QUICKPAY_SERVICE_KEY,
      data,
    )
    return result.getResponse()
  }

  async preparePay(data: any) {
    const result = await this.payGateService.payByCard(
      process.env.QUICKPAY_SERVICE_ID,
      process.env.QUICKPAY_SERVICE_KEY,
      { vendor_form: data, pay_form: { card_number: '8600492948515503', card_expire: '1128' } },
    )
    return result.getResponse()
  }
}
