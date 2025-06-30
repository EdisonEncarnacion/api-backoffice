import { IsNotEmpty, IsString, IsNumber, IsUUID, IsDateString } from 'class-validator';

export class CreateCashRegisterDto {
    @IsNumber()
    id_cash_register: number;


    id_user: string;

    @IsNumber()
    id_state: number;

    @IsDateString()
    opennig_date: string;

    @IsDateString()
    last_closing_date: string;

    @IsDateString()
    register_date: string;

    @IsUUID()
    id_local: string;

    @IsNumber()
    id_work_shift: number; // ← corregido

    @IsNumber()
    id_serie: number; // ← corregido
}
