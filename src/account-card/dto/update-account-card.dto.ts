import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountCardDto } from './create-account-card.dto';

export class UpdateAccountCardDto extends PartialType(CreateAccountCardDto) {}
