import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateDepositRequest, FindAllRegionResponse, QueryParams } from '@interfaces'
import { PrismaService } from 'prisma/prisma.service'
import { CustomRequest } from 'custom'
import { DepositStatus, DepositStatusOutPut } from 'enums/deposit.enum'
import { FilterService } from '@helpers'
import { FindAllDepositResponse } from 'interfaces/deposit.interface'

@Injectable()
export class DepositService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any): Promise<FindAllDepositResponse> {
    const { limit, sort, filters } = query

    const parsedLimit = parseInt(limit, 10)

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const deposits = await FilterService?.applyFilters('deposit', parsedFilters, parsedSort)

    const result = []

    for (const deposit of deposits) {
      result.push({
        id: deposit.id,
        amount: deposit.amount,
        status: deposit.status,
        comment: deposit.comment,
        checkPhoto: deposit.checkPhoto,
        type: deposit.type,
        source: deposit.source,
        cashCount: deposit.cashCount,
        operatorId: deposit.operatorId,
        incasatorId: deposit.incasatorId,
        confirmedId: deposit.confirmedId,
        bankId: deposit.bankId,
        createdAt: deposit.createdAt,
      })
    }

    return {
      data: result,
    }
  }

  async findOne(id: number) {
    const deposit = await this.prisma.deposit.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!deposit) {
      throw new NotFoundException('Deposit not found with given ID!')
    }

    const result = {
      id: deposit.id,
      amount: deposit.amount,
      status: deposit.status,
      comment: deposit.comment,
      checkPhoto: deposit.checkPhoto,
      type: deposit.type,
      source: deposit.source,
      cashCount: deposit.cashCount,
      operatorId: deposit.operatorId,
      incasatorId: deposit.incasatorId,
      confirmedId: deposit.confirmedId,
      bankId: deposit.bankId,
      createdAt: deposit.createdAt,
    }

    return {
      data: result,
    }
  }

  async findIncasatorStatic(userId: number): Promise<FindAllDepositResponse> {
    const depositStatic = await this.prisma.deposit.findMany({
      where: {
        incasatorId: userId,
        deletedAt: {
          equals: null,
        },
      },
    })

    const result = depositStatic.map((deposit) => ({
      id: deposit?.id,
      amount: deposit?.amount,
      status: deposit?.status,
      comment: deposit?.comment,
      checkPhoto: deposit?.checkPhoto,
      type: deposit?.type,
      source: deposit?.source,
      cashCount: deposit?.cashCount,
      operatorId: deposit?.operatorId,
      incasatorId: deposit?.incasatorId,
      confirmedId: deposit?.confirmedId,
      bankId: deposit?.bankId,
      createdAt: deposit?.createdAt,
    }))

    return {
      data: result,
    }
  }

  async create(data: CreateDepositRequest, incasatorId: number) {
    return this.prisma.$transaction(async (prisma) => {
      const opearatorExists = await prisma.user.findUnique({
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

      await prisma.user.update({
        where: {
          id: data?.operatorId,
          deletedAt: {
            equals: null,
          },
        },
        data: {
          cashCount: 0,
          updatedAt: new Date(),
        },
      })

      const totalAmountInOperator = await prisma.userBalance.findUnique({
        where: {
          userId: data?.operatorId,
          deletedAt: {
            equals: null,
          },
        },
      })

      const incasatorBalance = await prisma.userBalance.findUnique({
        where: {
          userId: incasatorId,
          deletedAt: {
            equals: null,
          },
        },
      })

      await prisma.userBalance.update({
        where: {
          userId: data?.operatorId,
          deletedAt: {
            equals: null,
          },
        },
        data: {
          balance: 0,
          updatedAt: new Date(),
        },
      })

      await prisma.userBalance.update({
        where: {
          userId: incasatorId,
          deletedAt: {
            equals: null,
          },
        },
        data: {
          balance: totalAmountInOperator?.balance + incasatorBalance?.balance,
          updatedAt: new Date(),
        },
      })

      const newDeposit = await prisma.deposit.create({
        data: {
          operatorId: data?.operatorId,
          incasatorId: incasatorId,
          amount: totalAmountInOperator?.balance,
          cashCount: opearatorExists?.cashCount,
          status: DepositStatus.STATUS_CREATE,
        },
      })

      return {
        status: 201,
        message: 'Deposit succesfully created',
        depositStatus: DepositStatusOutPut.STATUS_CREATE,
      }
    })
  }

  async update(id: number, data: any) {
    return `This action updates a #${id} deposit`
  }

  async remove(id: number) {
    return `This action removes a #${id} deposit`
  }
}
