import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { BankService } from './bank.service'
import { CreateBankDTO } from './dto'
import { UpdateBankDTO } from './dto/update-bank.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Bank Service')
@Controller({
  version: '1',
  path: 'bank',
})
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  findAll() {
    return this.bankService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankService.findOne(+id)
  }

  @Post()
  create(@Body() createBankDto: CreateBankDTO) {
    return this.bankService.create(createBankDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDTO) {
    return this.bankService.update(+id, updateBankDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankService.remove(+id)
  }
}
