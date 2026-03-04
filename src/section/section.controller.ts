import { Controller, Get, Query } from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('sync')
export class SectionController {
    constructor(private readonly sectionService: SectionService) { }

    @Get('section')
    async getSections(@Query('since') since?: string) {
        return this.sectionService.getSectionsForSync(since);
    }
}
