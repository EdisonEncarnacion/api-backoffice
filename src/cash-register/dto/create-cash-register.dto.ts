import { IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateCashRegisterDto {
    @IsNumber()
    id_cash_register: number;

    @IsNumber()
    id_user: number;

    @IsNumber()
    id_state: number;

    @IsDateString()
    opennig_date: string;

    @IsOptional()
    @IsDateString()
    last_closing_date?: string | null; // ✅ Acepta null o string

    @IsDateString()
    register_date: string;

    @IsNumber()
    id_local: number;

    @IsNumber()
    id_work_shift: number;

    @IsNumber()
    id_serie: number;
}
