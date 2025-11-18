import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashRegister } from './entities/cash-register.entity';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CashRegisterService {
  constructor(
    @InjectRepository(CashRegister)
    private readonly cashRegisterRepo: Repository<CashRegister>,
  ) {}

  async create(dto: CreateCashRegisterDto): Promise<CashRegister> {
    const userUUID = dto.id_user;

    const existing = await this.cashRegisterRepo.findOne({
      where: { cash_register_code: dto.id_cash_register },
    });

    if (existing) {
      existing.id_state = dto.id_state;
      existing.last_closing_date = dto.last_closing_date
        ? new Date(dto.last_closing_date)
        : null;
      existing.updated_at = new Date();

      return await this.cashRegisterRepo.save(existing);
    }

    const cashRegister = this.cashRegisterRepo.create({
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

    const result = await this.cashRegisterRepo.save(cashRegister);

    return result as CashRegister;
  }

  async update(cashRegisterCode: number, data: { id_state: number }) {
    const caja = await this.cashRegisterRepo.findOneBy({
      cash_register_code: cashRegisterCode,
    });

    if (!caja) return null;

    caja.id_state = data.id_state;
    caja.updated_at = new Date();

    return await this.cashRegisterRepo.save(caja);
  }

  async updateByCode(cash_register_code: number, data: { id_state: number }) {
  const caja = await this.cashRegisterRepo.findOne({
    where: { cash_register_code },
  });

  if (!caja) {
    console.warn(`No se encontró caja con cash_register_code = ${cash_register_code}`);
    return null;
  }

  caja.id_state = data.id_state;
  caja.updated_at = new Date();

  const updated = await this.cashRegisterRepo.save(caja);
  console.log(`Caja ${cash_register_code} actualizada con estado ${data.id_state}`);
  return updated;
}


}
