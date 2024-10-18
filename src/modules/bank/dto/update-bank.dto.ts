import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { UpdateBankRequest } from '@interfaces'

export class UpdateBankDTO implements UpdateBankRequest {
  @IsOptional()
  @IsString()
  name: string; 

  @IsOptional()
  @IsString()
  percentage: number;
  
  @IsOptional()
  @IsString()
  regionId: number;
}
