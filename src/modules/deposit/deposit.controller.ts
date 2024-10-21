import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common'
import { DepositService } from './deposit.service'
import { CreateDepositDTO } from './dto'
import { ApiTags } from '@nestjs/swagger'
import { CheckTokenGuard } from 'guards'
import { CustomRequest } from 'custom'
import { QueryParams } from '@interfaces'

@ApiTags('Deposits Service')
@Controller({
  version: '1',
  path: 'deposits',
})
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  findAll(@Query() query: QueryParams) {
    return this.depositService.findAll(query)
  }

  @Get('incasator-static')
  findIncasatorDeposit(@Req() request: CustomRequest) {
    return this.depositService.findIncasatorStatic(request?.user?.id)
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
