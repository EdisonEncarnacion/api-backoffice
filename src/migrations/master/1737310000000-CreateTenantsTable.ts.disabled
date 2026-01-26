import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTenantsTable1737310000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tenants',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'subdomain',
                        type: 'varchar',
                        length: '100',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'company_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        length: '20',
                        default: "'active'",
                        isNullable: false,
                    },
                    {
                        name: 'db_host',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'db_port',
                        type: 'int',
                        default: 5432,
                        isNullable: false,
                    },
                    {
                        name: 'db_name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'db_user',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'db_password',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'NOW()',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'NOW()',
                        isNullable: false,
                    },
                    {
                        name: 'last_migration_version',
                        type: 'varchar',
                        length: '100',
                        isNullable: true,
                    },
                    {
                        name: 'max_connections',
                        type: 'int',
                        default: 10,
                        isNullable: false,
                    },
                    {
                        name: 'timezone',
                        type: 'varchar',
                        length: '50',
                        default: "'UTC'",
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        // Crear índices
        await queryRunner.createIndex(
            'tenants',
            new TableIndex({
                name: 'idx_tenants_subdomain',
                columnNames: ['subdomain'],
            }),
        );

        await queryRunner.createIndex(
            'tenants',
            new TableIndex({
                name: 'idx_tenants_status',
                columnNames: ['status'],
            }),
        );

        // Agregar constraint de status
        await queryRunner.query(`
      ALTER TABLE tenants 
      ADD CONSTRAINT chk_status 
      CHECK (status IN ('active', 'inactive', 'suspended'))
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tenants');
    }
}
