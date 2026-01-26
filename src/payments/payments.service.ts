import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async create(dto: CreatePaymentDto) {
    const dataSource = await this.tenantConnection.getDataSource();
    const paymentsRepository = dataSource.getRepository(Payment);
    const payment = paymentsRepository.create(dto);
    return await paymentsRepository.save(payment);
  }

  async findAll() {
    const dataSource = await this.tenantConnection.getDataSource();
    const paymentsRepository = dataSource.getRepository(Payment);
    return paymentsRepository.find();
  }
}
