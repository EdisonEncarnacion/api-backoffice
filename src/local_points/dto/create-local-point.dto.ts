import { IsString, IsUUID, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateLocalPointDto {
    @IsUUID()
    id_local_point: string;

    @IsUUID()
    client_id: string;

    @IsNumber()
    balance: number;

    @IsOptional()
    @IsDateString()
    created_at?: string;

    @IsOptional()
    @IsDateString()
    updated_at?: string;

    @IsOptional()
    @IsString()
    state_audit?: string;
}
