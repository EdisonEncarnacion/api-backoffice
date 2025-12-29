import { Controller, Get, Query } from '@nestjs/common';
import { AuthorizationCodeService } from './authorization-code.service';

@Controller('sync')
export class AuthorizationCodeController {
    constructor(private readonly authorizationCodeService: AuthorizationCodeService) { }

    @Get('authorization-code')
    async getAuthorizationCodes(@Query('since') since?: string) {
        return this.authorizationCodeService.getAuthorizationCodesForSync(since);
    }
}
