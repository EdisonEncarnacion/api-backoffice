export class CreateSaleDetailDto {
    quantity: number;
    product_price: number;
    tax_detail: number;
    total_amount: number;
    system_date: Date;
    id_transaction: string;
    id_product: string;
    id_sale: string;
    id_side: string;
}
