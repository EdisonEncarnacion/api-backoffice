import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { CreateSaleWithDetailsDto } from './dto/create-sale-with-details.dto';
import { SaleDetail } from '../sale-details/sale-detail.entity';
import { UuidMapperService } from '../shared/uuid-mapper.service';
import { randomUUID } from 'crypto'; 

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,

    @InjectRepository(SaleDetail)
    private readonly saleDetailsRepository: Repository<SaleDetail>,

    private readonly dataSource: DataSource,
    private readonly uuidMapper: UuidMapperService
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
      const { sale, sale_details } = dto;
  
      
      sale.id_sale = randomUUID();
  
     
      sale.id_local = await this.uuidMapper.mapIdToUuid('local', +sale.id_local);
      sale.id_user = await this.uuidMapper.mapIdToUuid('user_auth', +sale.id_user);
      sale.id_payment_type = await this.uuidMapper.mapIdToUuid('payment_type', +sale.id_payment_type);
      sale.id_cash_register = await this.uuidMapper.mapIdToUuid('cash_register', +sale.id_cash_register);

  
      
  
      if (sale.state === null || sale.state === undefined) {
        console.warn('WARNING: "state" no fue enviado. Asignando 1 por defecto.');
        sale.state = 1;
      }
  
      sale.updated_at = sale.updated_at ?? sale.created_at ?? new Date();
  
      console.log('Venta con campos listos para guardar:', sale);
  
      const createdSale = queryRunner.manager.create(Sale, sale);
      const savedSale = await queryRunner.manager.save(Sale, createdSale);
  
      
      const details = await Promise.all(
        sale_details.map(async (detail) => {
          const newDetail = {
            ...detail,
            id_sale_detail: randomUUID(),
            id_sale: savedSale.id_sale,
            id_transaction: await this.uuidMapper.mapIdToUuid('transaction_controller', +detail.id_transaction),
            id_side: await this.uuidMapper.mapIdToUuid('side', +detail.id_side),
          };
          return queryRunner.manager.create(SaleDetail, newDetail);
        })
      );
  
      await queryRunner.manager.save(SaleDetail, details);
  
      await queryRunner.commitTransaction();
      return { sale: savedSale, details };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error al guardar venta con detalles:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.salesRepository.find();
  }
}
