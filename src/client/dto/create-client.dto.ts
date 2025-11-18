// create-client.dto.ts
export class CreateClientDto {
  id_client: string;
  client_code: string;
  first_name: string;
  last_name: string;
  document_number: string;
  document_type_id: number; 
  phone_number: string;    
  email: string;
  date_of_birth?: Date;
  origin_branch_id: string | null; 
  created_at?: Date;
  updated_at?: Date;
  state: number; 
  updated_sync_at?: Date;
}
