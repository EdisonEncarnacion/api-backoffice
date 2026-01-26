import { Module } from '@nestjs/common';
import { AuthorizationCodeService } from './authorization-code.service';
import { AuthorizationCodeController } from './authorization-code.controller';

@Module({
    controllers: [AuthorizationCodeController],
    providers: [AuthorizationCodeService],
})
export class AuthorizationCodeModule { }
