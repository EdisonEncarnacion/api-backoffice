import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('receipt_configuration')
export class ReceiptConfiguration {
    @PrimaryColumn('uuid')
    id_receipt_configuration: string;

    @Column({ type: 'varchar', nullable: true })
    schedule_interval: string;

    @Column({ type: 'bool', nullable: true })
    is_active: boolean;

    @Column({ type: 'varchar', nullable: true })
    id_sale_document_type: string;

    @Column({ type: 'uuid', nullable: true })
    id_client: string;

    @Column({ type: 'timestamp', nullable: true })
    created_by: Date;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ type: 'uuid', nullable: true })
    id_local: string;

    @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
    max_amount: number;

    @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
    max_amount_client: number;

    @Column({ type: 'varchar', nullable: true })
    type: string;
}
