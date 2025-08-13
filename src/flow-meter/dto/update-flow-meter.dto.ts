import { PartialType } from '@nestjs/mapped-types';
import { CreateFlowMeterDto } from './create-flow-meter.dto';

export class UpdateFlowMeterDto extends PartialType(CreateFlowMeterDto) {}
