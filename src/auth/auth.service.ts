import { jwtConstants } from '@constants'
import { LoginRequest, LoginResponse } from '@interfaces'
import { UsersService } from '@modules'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { signJwt } from 'helpers/jwt.helper'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    private readonly prisma: PrismaService,
  ) {}

  async login(data: LoginRequest): Promise<LoginResponse> {
    console.log(1)

    const user = await this.usersService.validate({ email: data.email })
    console.log(1)

    const checkUser = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    })

    if (data.password !== user.password) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = signJwt(
      {
        id: user?.id,
        login: user?.login,
      },
      jwtConstants.secret,
      60 * 60 * 9,
    )

    return {
      accessToken,
    }
  }
}
