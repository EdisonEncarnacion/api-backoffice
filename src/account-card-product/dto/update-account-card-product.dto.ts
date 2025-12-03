import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountCardProductDto } from './create-account-card-product.dto';

export class UpdateAccountCardProductDto extends PartialType(CreateAccountCardProductDto) {}
