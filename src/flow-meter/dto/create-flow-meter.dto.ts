import {
  IsUUID,
  IsInt,
  IsOptional,
  IsNumber,
  IsDateString,
  IsString,
  Length,
} from "class-validator";

export class CreateFlowMeterDto {
  @IsUUID()
  id: string;

  @IsInt()
  side_id: number;

  @IsInt()
  id_cash_register: number;

  @IsNumber()
  product_id: number;

  @IsNumber()
  initial_cm: number;

  @IsNumber()
  final_cm: number;

  @IsUUID()
  local_id: string;

  @IsDateString()
  created_at: string;

  @IsOptional()
  @IsDateString()
  updated_at?: string | null;

  @IsOptional()
  @IsString()
  @Length(1, 1) 
  state_audit?: string | null;

  @IsInt()
  hose_id: number;
}
