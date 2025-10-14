import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const payment = this.paymentsRepository.create(dto);
    return await this.paymentsRepository.save(payment);
  }

  findAll() {
    return this.paymentsRepository.find();
  }
}
