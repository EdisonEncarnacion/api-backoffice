import { PartialType } from '@nestjs/mapped-types';
import { CreateHoseDto } from './create-hose.dto';

export class UpdateHoseDto extends PartialType(CreateHoseDto) {}
