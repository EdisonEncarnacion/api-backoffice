import { Controller, Get, HttpCode } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuth } from './entities/user-auth.entity';

@Controller('user-auth')
export class UserAuthController {
    constructor(private readonly userAuthService: UserAuthService) { }

    @Get()
    @HttpCode(200)
    async findAll(): Promise<{ statusCode: number; message: string; data: UserAuth[] }> {
        const users = await this.userAuthService.findAll();
        return {
            statusCode: 200,
            message: 'Usuarios obtenidos correctamente',
            data: users,
        };
    }
}
