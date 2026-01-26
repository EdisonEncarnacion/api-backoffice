import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Deposit } from './entities/deposit.entity';
import { DepositType } from './entities/deposit-type.entity';
import { CreateDepositDto } from './dto/create-deposit.dto';

@Injectable()
export class DepositService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  private async getCashRegisterInfo(id_cash_register: number): Promise<{ cashRegisterUUID: string; localUUID: string }> {
    if (typeof id_cash_register !== 'number') {
      throw new Error(`id_cash_register inválido o no enviado: ${id_cash_register}`);
    }

    const dataSource = await this.tenantConnection.getDataSource();

    const result = await dataSource.query(
      `SELECT id_cash_register, id_local FROM cash_register WHERE cash_register_code = $1`,
      [id_cash_register.toString()],
    );

    if (!result || result.length === 0) {
      throw new Error(`No se encontró caja con código = ${id_cash_register}`);
    }

    return {
      cashRegisterUUID: result[0].id_cash_register,
      localUUID: result[0].id_local,
    };
  }

  async createDeposit(depositDto: CreateDepositDto): Promise<Deposit> {
    const dataSource = await this.tenantConnection.getDataSource();
    const depositRepo = dataSource.getRepository(Deposit);
    const depositTypeRepo = dataSource.getRepository(DepositType);

    const existingType = await depositTypeRepo.findOneBy({
      code_deposit_type: depositDto.code_deposit_type,
    });

    if (!existingType) {
      throw new NotFoundException(
        `El tipo de depósito '${depositDto.code_deposit_type}' no existe`,
      );
    }

    const { cashRegisterUUID, localUUID } = await this.getCashRegisterInfo(depositDto.id_cash_register);

    console.log('Datos para registrar depósito:');
    console.log('→ Código de caja:', depositDto.id_cash_register);
    console.log('→ UUID caja:', cashRegisterUUID);
    console.log('→ UUID local:', localUUID);
    console.log('→ Monto:', depositDto.total_amount);
    console.log('→ Tipo de depósito:', depositDto.code_deposit_type);

    const existingDeposit = await depositRepo.findOneBy({
      id_deposit: depositDto.id_deposit,
    });

    if (existingDeposit) {
      existingDeposit.total_amount = depositDto.total_amount;
      existingDeposit.id_currency = depositDto.id_currency;
      // existingDeposit.state = depositDto.state;
      existingDeposit.updated_at = new Date();
      existingDeposit.date_process = new Date(depositDto.date_process);

      return await depositRepo.save(existingDeposit);
    }

    const deposit = depositRepo.create({
      ...depositDto,
      id_cash_register: cashRegisterUUID,
      id_local: localUUID,
      date_process: new Date(depositDto.date_process),
      created_at: new Date(depositDto.created_at),
      updated_at: new Date(depositDto.updated_at),
    });

    return await depositRepo.save(deposit);
  }
}

