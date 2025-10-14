import { CreateSaleDto } from './create-sale.dto';
import { CreateSaleDetailDto } from '../../sale-details/dto/create-sale-detail.dto';
import { CreatePaymentDto } from '../../payments/dto/create-payment.dto';

export class CreateSaleWithDetailsDto {
  sale: CreateSaleDto;
  sale_details: CreateSaleDetailDto[];
  payments: CreatePaymentDto[];
}
