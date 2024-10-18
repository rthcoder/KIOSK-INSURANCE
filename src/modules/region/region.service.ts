import { Injectable } from '@nestjs/common'
import { CreateRegionRequest, FindAllRegionResponse, FindOneRegionResponse } from '@interfaces'
import { PrismaService } from 'prisma/prisma.service'
@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<FindAllRegionResponse> {
    const regions = await this.prisma.region.findMany({
      where: {
        deletedAt: {
          equals: null,
        },
      },
    })

    const result = []

    for (const region of regions) {
      result?.push({
        id: region?.id,
        name: region?.name,
        status: region?.status,
        createdAt: region?.createdAt,
      })
    }

    return {
      data: result,
    }
  }

  async findOne(id: number): Promise<FindOneRegionResponse> {
    const region = await this.prisma.region.findFirst({
      where: {
        id: id,
      },
    })

    const result = {
      id: region?.id,
      name: region?.name,
      status: region?.status,
      createdAt: region?.createdAt,
    }

    return {
      data: result,
    }
  }

  async create(data: CreateRegionRequest) {
    const newRegion = await this.prisma.region.create({
      data: data,
    })
  }

  update(id: number, updateRegionDto: any) {
    return `This action updates a #${id} region`
  }

  remove(id: number) {
    return `This action removes a #${id} region`
  }
}
