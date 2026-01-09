import { Controller, Get, Query } from '@nestjs/common';
import { RoleAccessService } from './role-access.service';

@Controller('sync')
export class RoleAccessController {
    constructor(private readonly roleAccessService: RoleAccessService) { }

    @Get('role-access')
    async getRoleAccess(@Query('since') since?: string) {
        return this.roleAccessService.getRoleAccessForSync(since);
    }

}
