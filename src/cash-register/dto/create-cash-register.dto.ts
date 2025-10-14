import { IsNotEmpty, IsNumber, IsOptional, IsDateString, IsUUID } from 'class-validator';
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
    last_closing_date?: string | null; 


    @IsUUID()        
    id_local: string;

    @IsNumber()
    id_work_shift: number;

    @IsOptional()
    @IsUUID()
    id_group_serie?: string;
}
