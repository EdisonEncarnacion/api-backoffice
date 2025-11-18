import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountCardType } from './entities/account-card-type.entity';
import { AccountCardTypeService } from './account-card-type.service';
import { AccountCardTypeController } from './account-card-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountCardType])],
  controllers: [AccountCardTypeController],
  providers: [AccountCardTypeService],
})
export class AccountCardTypeModule {}
