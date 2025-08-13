import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { FlowMeter } from './entities/flow-meter.entity';
import { CreateFlowMeterDto } from './dto/create-flow-meter.dto';

@Injectable()
export class FlowMeterService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(FlowMeter)
    private readonly flowMeterRepo: Repository<FlowMeter>,
  ) {}

  /**
   * Registra un FlowMeter convirtiendo IDs numéricos a UUIDs
   */
  async create(dto: CreateFlowMeterDto): Promise<FlowMeter> {
    const sideUuid = await this.mapIdToUuid('side', dto.side_id);
    const cashRegisterUuid = await this.mapCashRegisterUuidByCode(dto.id_cash_register);
    const hoseUuid = await this.mapIdToUuid('hose', dto.hose_id);
    const localUuid = await this.mapIdToUuid('local', dto.local_id);

    const flowMeter = this.flowMeterRepo.create({
      side_id: sideUuid,
      id_cash_register: cashRegisterUuid,
      product_id: dto.product_id, // int
      initial_cm: dto.initial_cm,
      final_cm: dto.final_cm,
      local_id: localUuid,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
      state_audit: 'A', // valor por defecto
      hose_id: hoseUuid,
    });

    return await this.flowMeterRepo.save(flowMeter);
  }

  private async mapIdToUuid(table: string, migrationSyncId: number): Promise<string> {
    const uuidColumn = `id_${table}`;
    const result = await this.dataSource.query(
      `SELECT ${uuidColumn} FROM ${table} WHERE migration_sync_id = $1 LIMIT 1`,
      [migrationSyncId],
    );
  
    if (!result[0]) {
      throw new NotFoundException(
        `UUID no encontrado en tabla '${table}' para migration_sync_id = ${migrationSyncId}`,
      );
    }
  
    return result[0][uuidColumn];
  }
  

  private async mapCashRegisterUuidByCode(code: number): Promise<string> {
    const uuidColumn = 'id_cash_register';
    const result = await this.dataSource.query(
      `SELECT ${uuidColumn} FROM cash_register WHERE cash_register_code = $1 LIMIT 1`,
      [code],
    );

    if (!result[0]) {
      throw new NotFoundException(
        `UUID no encontrado en tabla 'cash_register' para cash_register_code = ${code}`,
      );
    }

    return result[0][uuidColumn];
  }
}
