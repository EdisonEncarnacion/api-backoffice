import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountCard } from './entities/account-card.entity';
import { AccountCardService } from './account-card.service';
import { AccountCardController } from './account-card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountCard])],
  controllers: [AccountCardController],
  providers: [AccountCardService],
})
export class AccountCardModule {}
