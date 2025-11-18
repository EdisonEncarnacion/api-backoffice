export class CreateDriverDto {
  id_driver?: string;
  code_driver?: string;
  license?: string;
  first_name: string;
  last_name: string;
  document_number: string;
  phone_number?: string;
  email?: string;
  state?: number;
  created_at?: Date;
  updated_at?: Date;
  updated_sync_at?: Date;
}
