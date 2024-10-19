import { CreateUserRequest } from '@interfaces'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateUserDTO implements CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsString()
  password: string

  role: string

  @IsNotEmpty()
  @IsNumber()
  structureId: number

  @IsNotEmpty()
  @IsNumber()
  incasatorId: number

  @IsNotEmpty()
  @IsString()
  latitude?: string

  @IsNotEmpty()
  @IsString()
  longitude?: string
}
