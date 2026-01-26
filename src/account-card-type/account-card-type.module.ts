import { Module } from '@nestjs/common';
import { AccountCardTypeService } from './account-card-type.service';
import { AccountCardTypeController } from './account-card-type.controller';

@Module({
  controllers: [AccountCardTypeController],
  providers: [AccountCardTypeService],
})
export class AccountCardTypeModule {}
