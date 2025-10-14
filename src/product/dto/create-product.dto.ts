import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, IsDateString } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  product_id: number;

  @IsString()
  description: string;

  @IsString()
  foreign_name: string;

  @IsOptional()
  @IsString()
  product_code?: string;

  @IsOptional()
  @IsNumber()
  state?: number;

  @IsOptional()
  @IsString()
  group_code?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  is_taxable?: boolean;

  @IsOptional()
  @IsString()
  measurement_unit?: string;

  @IsOptional()
  @IsNumber()
  group_product_id?: number;

  @IsUUID()
  id_local: string;

  // 🔹 Fechas que puede mandar el Backoffice
  @IsOptional()
  @IsDateString()
  created_at?: string;

  @IsOptional()
  @IsDateString()
  updated_at?: string;
}
