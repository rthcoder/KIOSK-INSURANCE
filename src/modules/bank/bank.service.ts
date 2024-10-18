import { Injectable } from '@nestjs/common';
import { CreateBankRequest, UpdateBankRequest } from '@interfaces'
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BankService {
  constructor(
    private readonly prisma: PrismaService,
  ){}
  
  async findAll() {
    const banks = await this.prisma.bank.findMany(
      {
        where: {
          deletedAt: {
            equals: null
          }
        }
      }
    )
    return banks
  }

  findOne(id: number) {
    return `This action returns a #${id} bank`;
  }
  
  create(createBankDto: CreateBankRequest) {
    return 'This action adds a new bank';
  }

  update(id: number, updateBankDto: UpdateBankRequest) {
    return `This action updates a #${id} bank`;
  }

  remove(id: number) {
    return `This action removes a #${id} bank`;
  }
}
