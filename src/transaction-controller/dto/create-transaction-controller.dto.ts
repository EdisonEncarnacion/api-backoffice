import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTransactionControllerDto {
  @IsUUID()
  id_transaction: string; 

  @IsOptional()
  @IsString()
  internal_code?: string;

  @IsNumber()
  id_side: number;

  @IsNumber()
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
  @IsNumber()
  id_sale_document_type?: number | null;

  @IsNumber()
  id_product: number;
}
