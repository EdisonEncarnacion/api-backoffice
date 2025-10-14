import { IsInt, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateFlowMeterDto {
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

  @IsInt()
  local_id: number;

  @IsDateString()
  created_at: string;


  @IsOptional()
  @IsNumber()
  state_audit?: number | null;

  @IsInt()
  hose_id: number;
}
