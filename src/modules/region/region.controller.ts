import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { RegionService } from './region.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateRegionDTO, UpdateRegionDTO } from './dto'

@ApiTags('Region Service')
@Controller({
  version: '1',
  path: 'regions',
})
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.regionService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id)
  }

  @Post()
  create(@Body() createRegionDto: CreateRegionDTO) {
    return this.regionService.create(createRegionDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDTO) {
    return this.regionService.update(+id, updateRegionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id)
  }
}
