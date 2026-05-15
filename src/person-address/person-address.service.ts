// person-address.service.ts
import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { PersonAddress } from './entities/person-address.entity';
import { CreatePersonAddressDto } from './dto/create-person-address.dto';

@Injectable()
export class PersonAddressService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) {}

  async getPersonAddressesForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const repo = dataSource.getRepository(PersonAddress);

    const query = repo.createQueryBuilder('person_address');

    if (since) {
      query.where('person_address.updated_at > :since', { since });
    }

    const records = await query.getMany();

    return records.map((pa) => ({
      id_person_address: pa.id_person_address,
      person_type: pa.person_type,
      person_id: pa.person_id,
      address_id: pa.address_id,
      is_primary: pa.is_primary,
      valid_from: pa.valid_from,
      valid_to: pa.valid_to,
      state: pa.state,
      updated_sync_at: pa.updated_sync_at,
      created_at: pa.created_at,
      updated_at: pa.updated_at,
      state_audit: pa.state_audit,
    }));
  }

  async saveOrUpdatePersonAddressFromSync(dto: CreatePersonAddressDto) {
    try {
      const dataSource = await this.tenantConnection.getDataSource();
      const repo = dataSource.getRepository(PersonAddress);

      if (dto.state === null || dto.state === undefined) {
        dto.state = 1;
      }

      let record = await repo.findOne({
        where: { id_person_address: dto.id_person_address },
      });

      if (record) {
        Object.assign(record, {
          ...dto,
          id_person_address: record.id_person_address,
          updated_at: new Date(),
        });

        const updated = await repo.save(record);
        return {
          ...updated,
          message: 'PersonAddress actualizado correctamente',
        };
      }

      const newRecord = repo.create({
        ...dto,
        state: dto.state ?? 1,
        created_at: dto.created_at ?? new Date(),
        updated_at: new Date(),
      });

      const saved = await repo.save(newRecord);
      return {
        ...saved,
        message: 'PersonAddress creado correctamente',
      };
    } catch (err: any) {
      if (err.code === '23505' && err.detail?.includes('id_person_address')) {
        const dataSource = await this.tenantConnection.getDataSource();
        const repo = dataSource.getRepository(PersonAddress);

        const existing = await repo.findOne({
          where: { id_person_address: dto.id_person_address },
        });

        if (existing) {
          Object.assign(existing, {
            ...dto,
            id_person_address: existing.id_person_address,
            updated_at: new Date(),
          });
          const updated = await repo.save(existing);
          return {
            ...updated,
            message: 'PersonAddress ya existía, se actualizó correctamente',
          };
        }
      }

      throw err;
    }
  }

  async findById(id_person_address: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const repo = dataSource.getRepository(PersonAddress);
    return repo.findOne({ where: { id_person_address } });
  }
}
