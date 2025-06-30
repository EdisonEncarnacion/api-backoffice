import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashRegister } from './entities/cash-register.entity';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';
import { getOrCreateUUID } from '../utils/uuid-map'; // Asegúrate que esté en src/utils/

@Injectable()
export class CashRegisterService {
    constructor(
        @InjectRepository(CashRegister)
        private readonly cashRegisterRepo: Repository<CashRegister>,
    ) { }

    async create(dto: CreateCashRegisterDto): Promise<CashRegister> {
        const uuid = getOrCreateUUID(+dto.id_cash_register, 'cash_register');

        const cashRegister = this.cashRegisterRepo.create({
            id_cash_register: uuid,
            cash_register_code: String(dto.id_cash_register),
            id_user: dto.id_user,
            id_state: dto.id_state,
            opennig_date: new Date(dto.opennig_date),
            last_closing_date: new Date(dto.last_closing_date),
            register_date: new Date(dto.register_date),
            id_local: dto.id_local,
            id_work_shift: dto.id_work_shift,
            id_serie: dto.id_serie,
            created_at: new Date(),
            updated_at: new Date(),
            state: 1,
        });

        return await this.cashRegisterRepo.save(cashRegister);
    }
}
