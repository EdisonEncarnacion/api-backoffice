import { Controller, Get, Query } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('sync')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get('role')
    async getRoles(@Query('since') since?: string) {
        return this.roleService.getRolesForSync(since);
    }

}
