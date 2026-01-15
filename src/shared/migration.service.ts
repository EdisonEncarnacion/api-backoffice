import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MigrationService implements OnModuleInit {
    constructor(private dataSource: DataSource) { }

    async onModuleInit() {
        try {
            const migrations = await this.dataSource.runMigrations();
            if (migrations.length > 0) {
                console.log(`✅ ${migrations.length} miragiones ejecutadas exitosamente`);
            }
        } catch (error) {
            console.error('❌ Error al ejecutar migraciones:', error.message);
        }
    }
}
