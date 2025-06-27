import { IsUUID, IsString } from 'class-validator';

export class CreateClientDto {
    @IsUUID()
    id_client: string;

    @IsString()
    client_code: string;
}
