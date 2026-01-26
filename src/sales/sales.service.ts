import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
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
    private readonly tenantConnection: TenantConnectionProvider,
    private readonly uuidMapper: UuidMapperService,
  ) { }

  async create(dto: CreateSaleDto) {
    try {
      if (dto.state === null || dto.state === undefined) {
        console.warn('⚠️ "state" no fue enviado en create(). Asignando 1 por defecto.');
        dto.state = 1;
      }

      const dataSource = await this.tenantConnection.getDataSource();
      const salesRepository = dataSource.getRepository(Sale);

      const sale = salesRepository.create(dto);
      return await salesRepository.save(sale);
    } catch (error) {
      console.error('💥 Error al guardar venta:', error);
      throw error;
    }
  }

  async createWithDetails(dto: CreateSaleWithDetailsDto) {
    const dataSource = await this.tenantConnection.getDataSource();
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { sale, sale_details, payments } = dto;

      // 🔹 Generar ID si no existe
      sale.id_sale = sale.id_sale || randomUUID();

      // 🔹 Mapear UUIDs requeridos
      sale.id_user = sale.id_user;
      sale.id_payment_type = (await this.uuidMapper.mapIdToUuid(
        'payment_type',
        +sale.id_payment_type,
      )) as string;

      sale.id_cash_register = (await this.uuidMapper.mapIdToUuid(
        'cash_register',
        +sale.id_cash_register,
      )) as string;

      // 🔹 Nuevos campos (no requieren mapeo)
      sale.id_driver = sale.id_driver ?? null;
      sale.id_vehicle = sale.id_vehicle ?? null;
      sale.driver_snapshot = sale.driver_snapshot ?? null;
      sale.vehicle_snapshot = sale.vehicle_snapshot ?? null;

      // 🔹 Estado y fechas
      if (sale.state === null || sale.state === undefined) {
        console.warn('⚠️ "state" no fue enviado. Asignando 1 por defecto.');
        sale.state = 1;
      }

      sale.updated_at = sale.updated_at ?? sale.created_at ?? new Date();

      // 🔹 Guardar venta principal
      const createdSale = queryRunner.manager.create(Sale, sale);
      const savedSale = await queryRunner.manager.save(Sale, createdSale);

      // 🔹 Guardar detalles (transaction UUID directo, side mapeado)
      const details = await Promise.all(
        sale_details.map(async (detail) => {
          const newDetail: Partial<SaleDetail> = {
            ...detail,
            id_sale_detail: randomUUID(),
            id_sale: savedSale.id_sale,

            // ✅ transaction_controller ya es UUID
            id_transaction: detail.id_transaction ?? null,

            // ⚙️ side sigue siendo entero → mapeo a UUID
            id_side: detail.id_side
              ? await this.uuidMapper.mapIdToUuid('side', +detail.id_side)
              : null,
          };

          return queryRunner.manager.create(SaleDetail, newDetail);
        }),
      );

      await queryRunner.manager.save(SaleDetail, details);

      // 🔹 Guardar pagos
      const paymentEntities = payments.map((payment) =>
        queryRunner.manager.create(Payment, {
          ...payment,
          id_payment: randomUUID(),
          id_sale: savedSale.id_sale,
        }),
      );
      await queryRunner.manager.save(Payment, paymentEntities);

      // 🔹 Confirmar transacción
      await queryRunner.commitTransaction();

      return { sale: savedSale, details, payments: paymentEntities };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('💥 Error al guardar venta con detalles y pagos:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const dataSource = await this.tenantConnection.getDataSource();
    const salesRepository = dataSource.getRepository(Sale);
    return salesRepository.find();
  }
}

