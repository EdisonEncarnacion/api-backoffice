import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionControllerService } from './transaction-controller.service';
import { TransactionControllerController } from './transaction-controller.controller';
import { TransactionController } from './entities/transaction-controller.entity';
import { Side } from '../side/entities/side.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionController, Side])],
  controllers: [TransactionControllerController],
  providers: [TransactionControllerService],
})
export class TransactionControllerModule {}
