import { Controller, Get } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuth } from './entities/user-auth.entity';

@Controller('user-auth')
export class UserAuthController {
    constructor(private readonly userAuthService: UserAuthService) { }

    @Get()
    findAll(): Promise<UserAuth[]> {
        return this.userAuthService.findAll();
    }
}
