// address.service.ts
import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) {}

  async getAddressesForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const repo = dataSource.getRepository(Address);

    const query = repo.createQueryBuilder('address');

    if (since) {
      query.where('address.updated_at > :since', { since });
    }

    const addresses = await query.getMany();

    return addresses.map((a) => ({
      id_address: a.id_address,
      address_line1: a.address_line1,
      address_line2: a.address_line2,
      reference: a.reference,
      city: a.city,
      state_province: a.state_province,
      postal_code: a.postal_code,
      country_code: a.country_code,
      department_id: a.department_id,
      province_id: a.province_id,
      district_id: a.district_id,
      latitude: a.latitude,
      longitude: a.longitude,
      updated_sync_at: a.updated_sync_at,
      state: a.state,
      created_at: a.created_at,
      updated_at: a.updated_at,
      state_audit: a.state_audit,
    }));
  }

  async saveOrUpdateAddressFromSync(dto: CreateAddressDto) {
    try {
      const dataSource = await this.tenantConnection.getDataSource();
      const repo = dataSource.getRepository(Address);

      if (dto.state === null || dto.state === undefined) {
        dto.state = 1;
      }

      // Busca por id_address (UUID viene desde ventas)
      let address = await repo.findOne({
        where: { id_address: dto.id_address },
      });

      if (address) {
        Object.assign(address, {
          ...dto,
          id_address: address.id_address,
          updated_at: new Date(),
        });

        const updated = await repo.save(address);
        return {
          ...updated,
          message: 'Dirección actualizada correctamente',
        };
      }

      const newAddress = repo.create({
        ...dto,
        state: dto.state ?? 1,
        created_at: dto.created_at ?? new Date(),
        updated_at: new Date(),
      });

      const saved = await repo.save(newAddress);
      return {
        ...saved,
        message: 'Dirección creada correctamente',
      };
    } catch (err: any) {
      // Si hay duplicado por UUID, actualizamos
      if (err.code === '23505' && err.detail?.includes('id_address')) {
        const dataSource = await this.tenantConnection.getDataSource();
        const repo = dataSource.getRepository(Address);

        const existing = await repo.findOne({
          where: { id_address: dto.id_address },
        });

        if (existing) {
          Object.assign(existing, {
            ...dto,
            id_address: existing.id_address,
            updated_at: new Date(),
          });
          const updated = await repo.save(existing);
          return {
            ...updated,
            message: 'Dirección ya existía, se actualizó correctamente',
          };
        }
      }

      throw err;
    }
  }

  async findById(id_address: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const repo = dataSource.getRepository(Address);
    return repo.findOne({ where: { id_address } });
  }
}
