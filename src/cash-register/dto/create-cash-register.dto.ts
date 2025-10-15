import { IsNotEmpty, IsNumber, IsOptional, IsDateString, IsUUID } from 'class-validator';
export class CreateCashRegisterDto {
    @IsNumber()
    id_cash_register: number;

    @IsUUID()
    id_user: string;

    @IsNumber()
    id_state: number;

    @IsDateString()
    opennig_date: string;

    @IsOptional()
    @IsDateString()
    last_closing_date?: string | null; 

    @IsUUID()        
    id_local: string;

    @IsUUID()
    id_work_shift: string;

    @IsOptional()
    @IsUUID()
    id_group_serie?: string;
}
