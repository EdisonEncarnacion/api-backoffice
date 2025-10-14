export class CreatePaymentDto {
    id_payment: string;
    date: Date;
    state: number;
    description?: string;
    amount: number;
    id_payment_method: number;
    id_currency: number;
    id_sale: string;
    created_at: Date;
  }
  