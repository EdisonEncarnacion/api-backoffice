import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Deposit } from './entities/deposit.entity';
import { DepositType } from './entities/deposit-type.entity';
import { CreateDepositDto } from './dto/create-deposit.dto';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(Deposit)
    private depositRepo: Repository<Deposit>,
    @InjectRepository(DepositType)
    private depositTypeRepo: Repository<DepositType>,
    private readonly dataSource: DataSource,
  ) {}

  private async getCashRegisterUUID(id_cash_register: number): Promise<string> {
    if (typeof id_cash_register !== 'number') {
      throw new Error(`❌ id_cash_register inválido o no enviado: ${id_cash_register}`);
    }

    const result = await this.dataSource.query(
      `SELECT id_cash_register FROM cash_register WHERE cash_register_code = $1`,
      [id_cash_register.toString()],
    );

    if (!result || result.length === 0) {
      throw new Error(`❌ No se encontró caja con código = ${id_cash_register}`);
    }

    return result[0].id_cash_register;
  }

  async createDeposit(depositDto: CreateDepositDto): Promise<Deposit> {
    // Verificar que el tipo de depósito ya exista
    const existingType = await this.depositTypeRepo.findOneBy({
      code_deposit_type: depositDto.code_deposit_type,
    });

    if (!existingType) {
      throw new NotFoundException(
        `El tipo de depósito '${depositDto.code_deposit_type}' no existe`,
      );
    }

    // Obtener el UUID de la caja
    const cashRegisterUUID = await this.getCashRegisterUUID(depositDto.id_cash_register);

    // Crear el depósito
    const deposit = this.depositRepo.create({
      ...depositDto,
      id_cash_register: cashRegisterUUID,
      date_process: new Date(depositDto.date_process),
      created_at: new Date(depositDto.created_at),
      updated_at: new Date(depositDto.updated_at),
    });

    return await this.depositRepo.save(deposit);
  }
}
