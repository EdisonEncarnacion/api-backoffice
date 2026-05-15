// create-address.dto.ts
export class CreateAddressDto {
  id_address: string;
  address_line_1?: string;
  address_line_2?: string;
  reference?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country_code?: string;
  department_id?: string;
  province_id?: string;
  district_id?: string;
  latitude?: number;
  longitude?: number;
  updated_sync_at?: Date;
  state?: number;
  created_at?: Date;
  updated_at?: Date;
  state_audit?: string;
}
