import { InsuranceGateService } from 'gateRequest'
import { Injectable } from '@nestjs/common'
import { GetServiceRequest, GetStepRequest } from '@interfaces'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class InsuranceService {
  constructor(
    private readonly insuranceGateService: InsuranceGateService,
    private readonly prisma: PrismaService,
  ) {}

  async findCompany() {
    const result = await this.insuranceGateService.findCompany(
      process.env.QUICKPAY_SERVICE_ID,
      process.env.QUICKPAY_SERVICE_KEY,
    )
    return result.getResponse()
  }

  async findService(data: GetServiceRequest) {
    const result = await this.insuranceGateService.findService(
      data,
      process.env.QUICKPAY_SERVICE_ID,
      process.env.QUICKPAY_SERVICE_KEY,
    )
    return result.getResponse()
  }

  async getStep(data: GetStepRequest) {
    const result = await this.insuranceGateService.getStep(
      data,
      process.env.QUICKPAY_SERVICE_ID,
      process.env.QUICKPAY_SERVICE_KEY,
    )
    return result.getResponse()
  }

  async createInsurance(data: any, userId: any) {
    const result = await this.insuranceGateService.createInsurance(
      data,
      process.env.QUICKPAY_SERVICE_ID,
      process.env.QUICKPAY_SERVICE_KEY,
    )
    // const response = result.getResponse()
    const { anketa_id, order_id, polis_id, vendor_id } = result?.getInsuranceIds()

    console.log(typeof userId)

    const newInsurance = await this.prisma.insurance.create({
      data: {
        anketaId: anketa_id,
        status: 'created',
        polisId: polis_id,
        orderId: order_id,
        vendorId: vendor_id,
        userId: userId,
        companyId: 1,
        serviceId: 1,
        amount: 1000,
        createResId: 1,
      },
    })

    /*
    id
    anketaId
    status
    polisId
    orderId
    vendorId
    userId
    companyId
    serviceId
    */
  }
}
