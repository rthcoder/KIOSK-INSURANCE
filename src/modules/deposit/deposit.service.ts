import { Injectable } from '@nestjs/common'
import { CreateDepositRequest } from '@interfaces'

@Injectable()
export class DepositService {
  create(data: CreateDepositRequest) {
    return 'This action adds a new deposit'
  }

  findAll() {
    return `This action returns all deposit`
  }

  findOne(id: number) {
    return `This action returns a #${id} deposit`
  }

  update(id: number, data: any) {
    return `This action updates a #${id} deposit`
  }

  remove(id: number) {
    return `This action removes a #${id} deposit`
  }
}
