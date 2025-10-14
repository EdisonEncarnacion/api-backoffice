// src/group-serie/dto/update-group-serie.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupSerieDto } from './create-group-serie.dto';

export class UpdateGroupSerieDto extends PartialType(CreateGroupSerieDto) {}
