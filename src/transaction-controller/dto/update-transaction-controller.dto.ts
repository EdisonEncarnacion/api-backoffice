import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionControllerDto } from './create-transaction-controller.dto';

export class UpdateTransactionControllerDto extends PartialType(CreateTransactionControllerDto) {}
