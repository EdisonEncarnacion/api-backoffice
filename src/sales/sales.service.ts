import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { CreateSaleWithDetailsDto } from './dto/create-sale-with-details.dto';
import { SaleDetail } from '../sale-details/sale-detail.entity';
import { Payment } from '../payments/entities/payment.entity';
import { UuidMapperService } from '../shared/uuid-mapper.service';
import { randomUUID } from 'crypto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,

    @InjectRepository(SaleDetail)
    private readonly saleDetailsRepository: Repository<SaleDetail>,

    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,

    private readonly dataSource: DataSource,
    private readonly uuidMapper: UuidMapperService,
  ) {}

  async create(dto: CreateSaleDto) {
    try {
      if (dto.state === null || dto.state === undefined) {
        console.warn('WARNING: "state" no fue enviado en create(). Asignando 1 por defecto.');
        dto.state = 1;
      }
      const sale = this.salesRepository.create(dto);
      return await this.salesRepository.save(sale);
    } catch (error) {
      console.error('Error al guardar venta:', error);
      throw error;
    }
  }

  async createWithDetails(dto: CreateSaleWithDetailsDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      const { sale, sale_details, payments } = dto;
  
      
      sale.id_sale = randomUUID(); 
  

      sale.id_user = (await this.uuidMapper.mapIdToUuid('user_auth', +sale.id_user)) as string;
      sale.id_payment_type = (await this.uuidMapper.mapIdToUuid('payment_type', +sale.id_payment_type)) as string;
      sale.id_cash_register = (await this.uuidMapper.mapIdToUuid('cash_register', +sale.id_cash_register)) as string;

  
      if (sale.state === null || sale.state === undefined) {
        console.warn('WARNING: "state" no fue enviado. Asignando 1 por defecto.');
        sale.state = 1;
      }
  
      sale.updated_at = sale.updated_at ?? sale.created_at ?? new Date();
  
      // Guardar venta
      const createdSale = queryRunner.manager.create(Sale, sale);
      const savedSale = await queryRunner.manager.save(Sale, createdSale);
  
      // Guardar detalles
     // Guardar detalles
    // Guardar detalles
    const details = await Promise.all(
      sale_details.map(async (detail) => {
        const newDetail: Partial<SaleDetail> = {
          ...detail,
          id_sale_detail: randomUUID(),
          id_sale: savedSale.id_sale,
          // 👇 si id_transaction es null, se guarda null
          id_transaction: detail.id_transaction
            ? await this.uuidMapper.mapIdToUuid('transaction_controller', +detail.id_transaction)
            : null,
          // 👇 si id_side es null, lo enviamos como null
          id_side: detail.id_side
            ? await this.uuidMapper.mapIdToUuid('side', +detail.id_side)
            : null,
        };

        return queryRunner.manager.create(SaleDetail, newDetail);
      })
    );


      await queryRunner.manager.save(SaleDetail, details);
  
     
      const paymentEntities = payments.map((payment) =>
        queryRunner.manager.create(Payment, {
          ...payment,
          id_payment: randomUUID(),
          id_sale: savedSale.id_sale,
        })
      );
      await queryRunner.manager.save(Payment, paymentEntities);
  
      await queryRunner.commitTransaction();
      return { sale: savedSale, details, payments: paymentEntities };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error al guardar venta con detalles y pagos:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  

  findAll() {
    return this.salesRepository.find();
  }
}
