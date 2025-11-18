export class CreateAccountTypeDto {
  id_account_type: number;
  code: string;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  state_audit?: string;
}
