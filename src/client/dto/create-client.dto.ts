// src/client/dto/create-client.dto.ts
export class CreateClientDto {
  id_client: string;
  client_code: string;
  first_name: string;
  last_name: string;
  document_number: string;
  telphone_number: string;
  email: string;
  state: number;
  date_of_birth?: Date;
  created_at?: Date;
  updated_at?: Date;
  id_document_type: number;
  id_person_type: number;
  id_person: string;
  updated_sync_at?: Date;
  origin_branch_id: string | null;


}
