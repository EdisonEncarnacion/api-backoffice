export class CreateSaleDto {
    id_sale: string;
    state: string;
    total_amount: number;
    subtotal: number;
    total_discount: number;
    document_number: string;
    created_at: Date;
    updated_at: Date;
    op_grabada: number;
    total_tax: number;
    exonerado: number;
    transferencia_gratuita: number;
    id_local: string;
    id_sale_document_type: string;
    id_payment_type: string;
    id_cash_register: string;
    id_client: string;
    id_user: string;
}