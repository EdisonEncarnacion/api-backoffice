import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('sync')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async getUsers(
    @Query('since') since?: string,
    @Query('local_id') local_id?: string,
  ) {
    return this.userService.getUsersForSync(since, local_id);
  }
}
