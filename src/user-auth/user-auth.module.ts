import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { UserAuth } from './entities/user-auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAuth])],
  controllers: [UserAuthController],
  providers: [UserAuthService],
})
export class UserAuthModule { }
