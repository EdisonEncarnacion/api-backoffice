import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Local } from './entities/local.entity';

@Injectable()
export class LocalService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) {}

  async getLocalsForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const localRepo = dataSource.getRepository(Local);

    const query = localRepo.createQueryBuilder('local');

    if (since) {
      query.where('local.updated_at > :since', { since });
    }

    const locals = await query.getMany();

    return locals.map((l) => ({
      id_local: l.id_local,
      name: l.name,
      local_code: l.local_code,
      telephone_number: l.telephone_number,
      address: l.address,
      ruc: l.ruc,
      ubigeo: l.ubigeo,
      local_name: l.local_name,
      country_code: l.country_code,
      urbanizacion: l.urbanizacion,
      phone_number: l.phone_number,
      email: l.email,
      migration_sync_id: l.migration_sync_id,
      id_department: l.id_department,
      id_province: l.id_province,
      id_district: l.id_district,
      created_at: l.created_at,
      updated_at: l.updated_at,
      state_audit: l.state_audit,
    }));
  }
}
