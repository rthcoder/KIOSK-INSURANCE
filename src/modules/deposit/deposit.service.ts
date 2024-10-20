import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateDepositRequest } from '@interfaces'
import { PrismaService } from 'prisma/prisma.service'
import { CustomRequest } from 'custom'

@Injectable()
export class DepositService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return `This action returns all deposit`
  }

  async findOne(id: number) {
    return `This action returns a #${id} deposit`
  }

  async create(data: CreateDepositRequest, incasatorId: number) {
    const opearatorExists = await this.prisma.user.findUnique({
      where: {
        id: data?.operatorId,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!opearatorExists) {
      throw new NotFoundException('Operator not found!')
    }

    const newDoposit = await this.prisma.deposit.create({
      data: {
        operatorId: data?.operatorId,
        incasatorId: incasatorId,
      },
    })

    // if (newDoposit) {
    //   return
    // }

    await this.prisma.user.update({
      where: {
        id: data?.operatorId,
      },
      data: {
        cashCount: 0,
      },
    })

    await this.prisma.userBalance.updateMany({
      where: {
        userId: data?.operatorId,
      },
      data: {
        balance: 0,
      },
    })

    return 1
  }

  async update(id: number, data: any) {
    return `This action updates a #${id} deposit`
  }

  async remove(id: number) {
    return `This action removes a #${id} deposit`
  }
}
