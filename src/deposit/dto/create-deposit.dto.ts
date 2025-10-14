// src/deposit/dto/create-deposit.dto.ts
import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateDepositDto {
    @IsNumber()
    id_deposit: number;
    
    @IsDateString()
    date_process: string;

    @IsNumber()
    id_cash_register: number;

    @IsNumber()
    total_amount: number;

    @IsString()
    deposit_number: string;

    @IsNumber()
    id_currency: number;

    @IsString()
    state: string;

    @IsDateString()
    created_at: string;

    @IsDateString()
    updated_at: string;

    @IsString()
    code_deposit_type: string;
}
