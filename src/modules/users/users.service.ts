import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany()
    return users
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst(
      {
        where: {
          id: id
        }
      }
    )

    if(!user) {
      throw new NotFoundException('User not found with given ID')
    }
    return user
  }

  async create(data: any):Promise<void> {
    await this.prisma.user.create({
      data,
    });
  }

  async update(id: number, data: any):Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        updateAt: new Date()
      },
    });
  }

  async delete(id: number) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return user;
  }


  async validate(data: any) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
        deletedAt: {
          equals: null
        }
      }
    })

    if (!user) {
      throw new NotFoundException('User does not exist')
    }

    return {
      id: user?.id,
      login: user?.email,
      password: user?.password,
    }
  }
}
