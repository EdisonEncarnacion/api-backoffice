import { IsBoolean, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateGroupSerieDto {
  @IsInt()
  id_tipo: number;

  @IsString()
  description: string;

  @IsBoolean()
  is_used: boolean;

  @IsUUID()
  id_local: string; 

  @IsOptional()
  @IsUUID()
  id_group_serie?: string; 
}
