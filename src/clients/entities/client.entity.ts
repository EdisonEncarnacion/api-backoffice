import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('client')
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id_client: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    client_code: string;
}
