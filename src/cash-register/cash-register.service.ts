import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { CashRegister } from './entities/cash-register.entity';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CashRegisterService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async create(dto: CreateCashRegisterDto): Promise<CashRegister> {
    const dataSource = await this.tenantConnection.getDataSource();
    const cashRegisterRepo = dataSource.getRepository(CashRegister);

    const userUUID = dto.id_user;

    const existing = await cashRegisterRepo.findOne({
      where: { cash_register_code: dto.id_cash_register, id_local: dto.id_local },
    });

    if (existing) {
      existing.id_state = dto.id_state;
      existing.last_closing_date = dto.last_closing_date
        ? new Date(dto.last_closing_date)
        : null;
      existing.updated_at = new Date();

      return await cashRegisterRepo.save(existing);
    }

    const cashRegister = cashRegisterRepo.create({
      id_cash_register: randomUUID(),
      cash_register_code: dto.id_cash_register,
      id_user: userUUID,
      id_state: dto.id_state,
      opennig_date: new Date(dto.opennig_date),
      last_closing_date: dto.last_closing_date
        ? new Date(dto.last_closing_date)
        : null,
      id_local: dto.id_local,
      id_group_serie: dto.id_group_serie || null,
      id_work_shift: dto.id_work_shift,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const result = await cashRegisterRepo.save(cashRegister);

    return result as CashRegister;
  }

  async update(cashRegisterCode: number, data: { id_state: number }) {
    const dataSource = await this.tenantConnection.getDataSource();
    const cashRegisterRepo = dataSource.getRepository(CashRegister);

    const caja = await cashRegisterRepo.findOneBy({
      cash_register_code: cashRegisterCode,
    });

    if (!caja) return null;

    caja.id_state = data.id_state;
    caja.updated_at = new Date();

    return await cashRegisterRepo.save(caja);
  }

  async updateByCode(cash_register_code: number, id_local: string, data: { id_state: number }) {
    const dataSource = await this.tenantConnection.getDataSource();
    const cashRegisterRepo = dataSource.getRepository(CashRegister);

    const caja = await cashRegisterRepo.findOne({
      where: { cash_register_code, id_local },
    });

    if (!caja) {
      console.warn(`No se encontró caja con code=${cash_register_code} y local=${id_local}`);
      return null;
    }

    caja.id_state = data.id_state;
    caja.updated_at = new Date();

    const updated = await cashRegisterRepo.save(caja);
    console.log(`Caja ${cash_register_code} (local ${id_local}) actualizada con estado ${data.id_state}`);
    return updated;
  }
}

