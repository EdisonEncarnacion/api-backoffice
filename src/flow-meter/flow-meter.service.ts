import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FlowMeter } from "./entities/flow-meter.entity";
import { CreateFlowMeterDto } from "./dto/create-flow-meter.dto";
import { UuidMapperService } from "../shared/uuid-mapper.service";

@Injectable()
export class FlowMeterService {
  constructor(
    @InjectRepository(FlowMeter)
    private readonly repo: Repository<FlowMeter>,
    private readonly uuidMapper: UuidMapperService,
  ) {}

  async create(dto: CreateFlowMeterDto): Promise<FlowMeter> {
    try {
      const sideUuid = await this.uuidMapper.mapIdToUuid("side", dto.side_id);
      const hoseUuid = await this.uuidMapper.mapIdToUuid("hose", dto.hose_id);
      const cashRegisterUuid = await this.uuidMapper.mapIdToUuid(
        "cash_register",
        dto.id_cash_register,
      );

      const flowMeter = this.repo.create({
        id: dto.id,
        side_id: sideUuid,
        id_cash_register: cashRegisterUuid,
        product_id: dto.product_id,
        initial_cm: dto.initial_cm,
        final_cm: dto.final_cm,
        local_id: dto.local_id,
        created_at: new Date(dto.created_at),
        updated_at: dto.updated_at ? new Date(dto.updated_at) : new Date(dto.created_at),
        state_audit: "A",
        hose_id: hoseUuid,
      } as FlowMeter); 

      const saved = await this.repo.save(flowMeter);
      return saved;
    } catch (error) {
      console.error("Error en FlowMeterService.create:", error);
      throw error;
    }
  }
}
