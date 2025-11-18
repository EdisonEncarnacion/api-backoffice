import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountCardTypeDto } from './create-account-card-type.dto';

export class UpdateAccountCardTypeDto extends PartialType(CreateAccountCardTypeDto) {}
