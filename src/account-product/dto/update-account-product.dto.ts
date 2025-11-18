import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountProductDto } from './create-account-product.dto';

export class UpdateAccountProductDto extends PartialType(CreateAccountProductDto) {}
