import { Module } from '@nestjs/common';
import { AccountCardService } from './account-card.service';
import { AccountCardController } from './account-card.controller';

@Module({
  controllers: [AccountCardController],
  providers: [AccountCardService],
})
export class AccountCardModule {}
