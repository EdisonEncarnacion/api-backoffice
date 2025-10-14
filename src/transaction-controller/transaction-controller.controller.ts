import { Controller, Post, Body } from '@nestjs/common';
import { TransactionControllerService } from './transaction-controller.service';
import { CreateTransactionControllerDto } from './dto/create-transaction-controller.dto';
import { TransactionController } from './entities/transaction-controller.entity';

@Controller('transaction-controller')
export class TransactionControllerController {
  constructor(private readonly service: TransactionControllerService) {}

  @Post()
  create(@Body() dto: CreateTransactionControllerDto): Promise<TransactionController> {
    return this.service.create(dto);
  }
}
