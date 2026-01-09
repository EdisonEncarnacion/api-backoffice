import { Controller, Get, Query } from '@nestjs/common';
import { ModuleService } from './module.service';

@Controller('sync')
export class ModuleController {
    constructor(private readonly moduleService: ModuleService) { }

    @Get('module')
    async getModules(@Query('since') since?: string) {
        return this.moduleService.getModulesForSync(since);
    }

}
