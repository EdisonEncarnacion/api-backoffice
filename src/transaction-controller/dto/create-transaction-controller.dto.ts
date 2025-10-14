import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionControllerDto {
  @IsInt()
  migration_sync_id: number; 

  @IsOptional()
  @IsString()
  internal_code?: string;

  @IsInt()
  id_side: number;

  @IsInt()
  id_state_transaction: number;

  @IsNumber()
  gallons: number;

  @IsOptional()
  @IsString()
  document_number?: string;

  @IsNumber()
  price: number;

  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  time?: string | null;

  @IsOptional()
  @IsString()
  controller?: string;

  @IsNumber()
  total: number;

  @IsOptional()
  @IsInt()
  id_sale_document_type?: number | null;

  @IsInt()
  id_product: number;
}
