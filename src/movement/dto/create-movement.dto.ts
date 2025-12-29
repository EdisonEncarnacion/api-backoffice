import { IsUUID, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateMovementDto {

  @IsUUID()
  id_movement: string; // ✅ OBLIGATORIO

  @IsUUID()
  account_id: string;

  @IsOptional()
  @IsUUID()
  card_id?: string;

  @IsNumber()
  type_id: number;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  reference_document?: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsNumber()
  balance_after?: number;

  @IsOptional()
  issued_at?: Date;

  @IsOptional()
  description?: string;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  updated_at?: Date;

  @IsOptional()
  @IsUUID()
  created_by?: string;
}
