import { PartialType } from '@nestjs/mapped-types';
import { CreateProductLocalDto } from './create-product-local.dto';

export class UpdateProductLocalDto extends PartialType(CreateProductLocalDto) {}
