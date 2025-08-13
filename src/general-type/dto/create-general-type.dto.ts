// src/general-type/dto/create-general-type.dto.ts
export class CreateGeneralTypeDto {
    category: string;
    code: string;
    name: string;
    description?: string;
    state_audit?: 'A' | 'I';
  }
  