// src/general-type/dto/update-general-type.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneralTypeDto } from './create-general-type.dto';

export class UpdateGeneralTypeDto extends PartialType(CreateGeneralTypeDto) {}
