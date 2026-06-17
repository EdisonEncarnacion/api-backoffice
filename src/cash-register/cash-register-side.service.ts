import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { CashRegisterSide } from './entities/cash-register-side.entity';
import { CashRegister } from './entities/cash-register.entity';
import { Side } from '../side/entities/side.entity';
import { CreateCashRegisterSideDto } from './dto/create-cash-register-side.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CashRegisterSideService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) {}

  /**
   * Crea o actualiza un registro en cash_register_sides (backoffice).
   *
   * Mapeo de columnas  ventas → backoffice:
   *   id_cash_register_side  (int)  → usado como clave de deduplicación junto con id_local
   *   id_cash_register       (int)  → cash_register_id (uuid) — buscado por cash_register_code + id_local
   *   id_side                (int)  → side_id (uuid) — buscado por migration_sync_id
   *   state                         → state
   *   id_local               (uuid) → id_local
   */
  async create(dto: CreateCashRegisterSideDto): Promise<CashRegisterSide> {
    const dataSource = await this.tenantConnection.getDataSource();

    const cashRegisterRepo = dataSource.getRepository(CashRegister);
    const sideRepo = dataSource.getRepository(Side);
    const cashRegisterSideRepo = dataSource.getRepository(CashRegisterSide);

    // ── 1. Resolver cash_register_id (UUID) desde el código numérico ────────
    const cashRegister = await cashRegisterRepo.findOne({
      where: {
        cash_register_code: dto.id_cash_register,
        id_local: dto.id_local,
      },
    });

    if (!cashRegister) {
      throw new NotFoundException(
        `No se encontró la caja con código ${dto.id_cash_register} en el local ${dto.id_local}`,
      );
    }

    // ── 2. Resolver side_id (UUID) desde migration_sync_id ──────────────────
    const side = await sideRepo.findOne({
      where: { migration_sync_id: dto.id_side },
    });

    if (!side) {
      throw new NotFoundException(
        `No se encontró el lado con migration_sync_id ${dto.id_side}`,
      );
    }

    // ── 3. Deduplicar: buscar si ya existe la relación ───────────────────────
    //    Usamos cash_register_id + side_id como clave de negocio única
    const existing = await cashRegisterSideRepo.findOne({
      where: {
        cash_register_id: cashRegister.id_cash_register,
        side_id: side.id_side,
      },
    });

    if (existing) {
      console.log(
        `[CashRegisterSide] Registro ya existe — actualizando estado. ` +
          `cash_register_id=${cashRegister.id_cash_register} ` +
          `side_id=${side.id_side} ` +
          `estado_anterior=${existing.state} estado_nuevo=${dto.state}`,
      );

      existing.state = dto.state;
      existing.updated_at = new Date();
      // Nunca guardar null — conservar valor actual o usar 'A' como fallback
      if (dto.state_audit != null) {
        existing.state_audit = dto.state_audit;
      } else if (!existing.state_audit) {
        existing.state_audit = 'A';
      }

      return await cashRegisterSideRepo.save(existing);
    }

    // ── 4. Crear nuevo registro ─────────────────────────────────────────────
    const newRecord = cashRegisterSideRepo.create({
      id: randomUUID(),
      state: dto.state,
      cash_register_id: cashRegister.id_cash_register,
      id_local: dto.id_local,
      side_id: side.id_side,
      state_audit: dto.state_audit ?? 'A',
      created_at: dto.created_at ? new Date(dto.created_at) : new Date(),
      updated_at: dto.updated_at ? new Date(dto.updated_at) : new Date(),
    });

    const result = await cashRegisterSideRepo.save(newRecord);

    console.log(
      `[CashRegisterSide] Nuevo registro creado. ` +
        `id=${result.id} ` +
        `cash_register_id=${result.cash_register_id} ` +
        `side_id=${result.side_id}`,
    );

    return result;
  }
}
