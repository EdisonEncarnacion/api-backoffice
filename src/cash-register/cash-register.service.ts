import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CashRegister } from './entities/cash-register.entity';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';
import { getOrCreateUUID } from '../utils/uuid-map';

@Injectable()
export class CashRegisterService {
    constructor(
        @InjectRepository(CashRegister)
        private readonly cashRegisterRepo: Repository<CashRegister>,
        private readonly dataSource: DataSource,
    ) { }

    private async getUUIDFromUserAuthById(id: number): Promise<string> {
        const result = await this.dataSource.query(
            'SELECT id_user FROM user_auth WHERE id = $1',
            [id],
        );

        if (!result || result.length === 0) {
            throw new Error(`❌ No se encontró usuario con id = ${id} en user_auth`);
        }

        return result[0].id_user;
    }

    private async getUUIDFromLocalById(id: number): Promise<string> {
        const result = await this.dataSource.query(
            'SELECT id_local FROM local WHERE id = $1',
            [id],
        );

        if (!result || result.length === 0) {
            throw new Error(`❌ No se encontró local con id = ${id}`);
        }

        return result[0].id_local;
    }

    async create(dto: CreateCashRegisterDto): Promise<CashRegister> {
        const uuid = getOrCreateUUID(dto.id_cash_register, 'cash_register');

        const userUUID = await this.getUUIDFromUserAuthById(+dto.id_user);
        const localUUID = await this.getUUIDFromLocalById(+dto.id_local);

        const cashRegister = this.cashRegisterRepo.create({
            id_cash_register: uuid,
            cash_register_code: String(dto.id_cash_register),
            id_user: userUUID,
            id_state: dto.id_state,
            opennig_date: new Date(dto.opennig_date),
            last_closing_date: dto.last_closing_date
                ? new Date(dto.last_closing_date)
                : null, // ✅ Permite null
            register_date: new Date(dto.register_date),
            id_local: localUUID,
            id_work_shift: dto.id_work_shift,
            id_serie: dto.id_serie,
            created_at: new Date(),
            updated_at: new Date(),
            state: 1,
        });

        return await this.cashRegisterRepo.save(cashRegister);
    }
}
