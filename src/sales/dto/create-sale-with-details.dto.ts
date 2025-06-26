import { CreateSaleDto } from './create-sale.dto';
import { CreateSaleDetailDto } from '../../sale-details/dto/create-sale-detail.dto';

export class CreateSaleWithDetailsDto {
    sale: CreateSaleDto;
    sale_details: CreateSaleDetailDto[]; // ← esta línea debe existir
}
