// create-person-address.dto.ts
export class CreatePersonAddressDto {
  id_person_address: string;
  person_type?: string;
  person_id?: string;
  address_id?: string;
  address_type_id?: number;
  is_primary?: boolean;
  valid_from?: Date;
  valid_to?: Date;
  state?: number;
  updated_sync_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  state_audit?: string;
}
