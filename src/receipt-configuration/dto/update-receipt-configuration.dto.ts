import { PartialType } from '@nestjs/mapped-types';
import { CreateReceiptConfigurationDto } from './create-receipt-configuration.dto';

export class UpdateReceiptConfigurationDto extends PartialType(
    CreateReceiptConfigurationDto,
) { }
