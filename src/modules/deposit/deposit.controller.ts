import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { DepositService } from './deposit.service'
import { CreateDepositDTO } from './dto'
import { ApiTags } from '@nestjs/swagger'
import { CheckTokenGuard } from 'guards'
import { CustomRequest } from 'custom'

@ApiTags('Deposits Service')
@Controller({
  version: '1',
  path: 'deposits',
})
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  findAll() {
    return this.depositService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depositService.findOne(+id)
  }

  @UseGuards(CheckTokenGuard)
  @Post()
  create(@Body() createDepositDto: CreateDepositDTO, @Req() request: CustomRequest) {
    return this.depositService.create(createDepositDto, request?.user?.id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepositDto: any) {
    return this.depositService.update(+id, updateDepositDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depositService.remove(+id)
  }
}
