import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { CreateSaleWithDetailsDto } from './dto/create-sale-with-details.dto';
import { SaleDetail } from '../sale-details/sale-detail.entity';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sale)
        private readonly salesRepository: Repository<Sale>,

        @InjectRepository(SaleDetail)
        private readonly saleDetailsRepository: Repository<SaleDetail>,

        private readonly dataSource: DataSource,
    ) { }

    async create(dto: CreateSaleDto) {
        try {
            const sale = this.salesRepository.create(dto);
            return await this.salesRepository.save(sale);
        } catch (error) {
            console.error('❌ Error al guardar venta:', error);
            throw error;
        }
    }

    async createWithDetails(dto: CreateSaleWithDetailsDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const sale = queryRunner.manager.create(Sale, dto.sale);
            const savedSale = await queryRunner.manager.save(Sale, sale);

            const details = dto.sale_details.map(detail =>

                queryRunner.manager.create(SaleDetail, {
                    ...detail,
                    id_sale: savedSale.id_sale, // asignamos el ID de la venta
                }),
            );

            await queryRunner.manager.save(SaleDetail, details);

            await queryRunner.commitTransaction();
            return { sale: savedSale, details };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('❌ Error al guardar venta con detalles:', error);
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    findAll() {
        return this.salesRepository.find();
    }
}
