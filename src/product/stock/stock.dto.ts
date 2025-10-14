// stock.dto.ts
import { IsNumber, IsUUID } from 'class-validator';

export class UpdateStockDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  stock: number;

  @IsUUID()
  id_local: string;
}
