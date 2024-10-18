import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RegionService } from './region.service'
import { CreateRegionDTO } from './dto/create-region.dto'
import { UpdateRegionDTO } from './dto/update-region.dto'
import { ApiTags } from '@nestjs/swagger'
import { CreateRegionRequest } from '@interfaces'

@ApiTags('Region Service')
@Controller({
  version: '1',
  path: 'regions',
})
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  findAll() {
    return this.regionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id)
  }

  @Post()
  create(@Body() createRegionDto: CreateRegionRequest) {
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
