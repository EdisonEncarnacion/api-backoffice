// src/general-type/general-type.controller.ts
import { Controller, Get } from '@nestjs/common';
import { GeneralTypeService } from './general-type.service';

@Controller('general-type')
export class GeneralTypeController {
  constructor(private readonly generalTypeService: GeneralTypeService) {}

  @Get('ping')
  ping() {
    return { message: 'GeneralType API funcionando' };
  }
}
