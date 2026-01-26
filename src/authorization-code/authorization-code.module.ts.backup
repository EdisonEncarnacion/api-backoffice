import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationCodeService } from './authorization-code.service';
import { AuthorizationCodeController } from './authorization-code.controller';
import { AuthorizationCode } from './entities/authorization-code.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuthorizationCode])],
    controllers: [AuthorizationCodeController],
    providers: [AuthorizationCodeService],
})
export class AuthorizationCodeModule { }
