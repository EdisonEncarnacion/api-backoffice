import { IsString, IsUUID, IsNumber, IsOptional, IsDateString, IsObject } from 'class-validator';

export class CreateLocalPointMovementDto {
    @IsUUID()
    id_local_point_movement: string;

    @IsUUID()
    local_point_id: string;

    @IsOptional()
    @IsUUID()
    sale_id?: string;

    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsNumber()
    balance_after?: number;

    @IsOptional()
    @IsObject()
    metadata?: object;

    @IsOptional()
    @IsString()
    movement_type?: string;

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
