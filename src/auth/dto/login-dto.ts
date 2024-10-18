import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDtoRequest {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
