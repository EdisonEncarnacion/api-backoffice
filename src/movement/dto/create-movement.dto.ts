export class CreateMovementDto {
  account_id?: string;
  card_id?: string;
  amount: number;
  reference_document?: string;
  description?: string;
  type_id: number;
  status?: string;       // <-- AGREGADO // <-- YA ESTABA
}
