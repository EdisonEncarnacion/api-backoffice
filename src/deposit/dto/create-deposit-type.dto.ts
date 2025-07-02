import { IsString, Length } from 'class-validator';

export class CreateDepositTypeDto {
    @IsString()
    code_deposit_type: string;

    @IsString()
    movement_type: string; // ← antes era @IsNumber()

    @IsString()
    description: string;

    @IsString()
    state: string; // ← antes era @IsNumber()
}
