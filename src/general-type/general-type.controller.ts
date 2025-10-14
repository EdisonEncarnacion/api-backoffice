// general-type.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { GeneralTypeService } from './general-type.service';

@Controller('sync/document-type')
export class GeneralTypeController {
  constructor(private readonly generalTypeService: GeneralTypeService) {}

  @Get('ventas-to-backoffice/:id')
  async ventasToBackoffice(@Param('id') id: number) {
    return this.generalTypeService.mapPersonDocumentTypeId(Number(id));
  }

  @Get('backoffice-to-ventas/:id')
  async backofficeToVentas(@Param('id') id: number) {
    return this.generalTypeService.mapPersonDocumentTypeIdToVentas(Number(id));
  }
}
