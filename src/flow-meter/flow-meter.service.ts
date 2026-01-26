import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { FlowMeter } from './entities/flow-meter.entity';
import { CreateFlowMeterDto } from './dto/create-flow-meter.dto';
import { UuidMapperService } from '../shared/uuid-mapper.service';

@Injectable()
export class FlowMeterService {
  constructor(
    private readonly tenantConnection: TenantConnectionProvider,
    private readonly uuidMapper: UuidMapperService,
  ) { }

  async create(dto: CreateFlowMeterDto): Promise<FlowMeter> {
    try {
      const dataSource = await this.tenantConnection.getDataSource();
      const repo = dataSource.getRepository(FlowMeter);

      const sideUuid = await this.uuidMapper.mapIdToUuid('side', dto.side_id);

      const cashRegisterUuid = await this.uuidMapper.mapIdToUuid(
        'cash_register',
        dto.id_cash_register,
      );

      const flowMeter = repo.create({
        id: dto.id,
        side_id: sideUuid,
        id_cash_register: cashRegisterUuid,
        product_id: dto.product_id,
        initial_cm: dto.initial_cm,
        final_cm: dto.final_cm,
        local_id: dto.local_id,
        created_at: new Date(dto.created_at),
        updated_at: dto.updated_at ? new Date(dto.updated_at) : new Date(dto.created_at),
        state_audit: 'A',
        hose_id: dto.hose_id ?? null,
      } as FlowMeter);

      const saved = await repo.save(flowMeter);
      return saved;
    } catch (error) {
      console.error('Error en FlowMeterService.create:', error);
      throw error;
    }
  }
}

