// src/sales/dto/create-sale.dto.ts
export class CreateSaleDto {
  id_sale: string;
  external_sale_id: string;
  state: number;
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
  id_sale_document_type: number;
  id_payment_type: string;
  id_cash_register: string;
  id_client: string;
  id_user: string;

  id_document_operation_type: number;
  id_sale_operation_type: number;
  serie: string;
  number: number;
  issue_date: Date;
  date_of_due: Date;
  exchange_rate_date: Date;
  currency_iso_code: string;
  exchange_rate: number;
  has_reference: boolean;
  is_used: boolean;
  sunat_hash: string;
  meta: any;
  perception: any;
  detraction: any;
  retention: any;
  collection_breakdown: any;
  total_to_pay: number;
  paid_amount: number;
  outstanding_balance: number;
  prices_include_tax: boolean;
  advance_amount: number;
  advance_balance: number;
  credit_note_amount: number;
  debit_note_amount: number;
  origin: string;

client_snapshot: any;
local_snapshot: any;

driver_snapshot?: any;
vehicle_snapshot?: any;

id_driver?: string | null;
id_vehicle?: string | null;
}
