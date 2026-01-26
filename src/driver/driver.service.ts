// src/driver/driver.service.ts
import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriverService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getDriversForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const driverRepository = dataSource.getRepository(Driver);

    const query = driverRepository.createQueryBuilder('driver');

    if (since) {
      query.where('driver.updated_at > :since', { since });
    } else {
      query
        .where('driver.updated_sync_at IS NULL')
        .orWhere('driver.updated_at > driver.updated_sync_at');
    }

    const drivers = await query.getMany();

    return drivers.map((d) => ({
      id_driver: d.id_driver,
      code_driver: d.code_driver,
      license: d.license,
      first_name: d.first_name,
      last_name: d.last_name,
      document_number: d.document_number,
      phone_number: d.phone_number,
      email: d.email,
      state: d.state,
      created_at: d.created_at,
      updated_at: d.updated_at,
      updated_sync_at: d.updated_sync_at,
    }));
  }

  async saveOrUpdateDriverFromSync(dto: CreateDriverDto) {
    try {
      const dataSource = await this.tenantConnection.getDataSource();
      const driverRepository = dataSource.getRepository(Driver);

      if (dto.state === null || dto.state === undefined) {
        dto.state = 1;
      }

      const existing = await driverRepository.findOne({
        where: { document_number: dto.document_number },
      });

      if (existing) {
        Object.assign(existing, {
          ...dto,
          id_driver: existing.id_driver,
          updated_at: new Date(),
          updated_sync_at: new Date(),
        });
        const updated = await driverRepository.save(existing);
        return { ...updated, message: 'Driver actualizado correctamente' };
      }

      const newDriver = driverRepository.create({
        ...dto,
        state: dto.state ?? 1,
        created_at: new Date(),
        updated_at: new Date(),
        updated_sync_at: new Date(),
      });
      const saved = await driverRepository.save(newDriver);
      return { ...saved, message: 'Driver creado correctamente' };
    } catch (err: any) {
      if (err.code === '23505' && err.detail?.includes('document_number')) {
        const dataSource = await this.tenantConnection.getDataSource();
        const driverRepository = dataSource.getRepository(Driver);

        const existing = await driverRepository.findOne({
          where: { document_number: dto.document_number },
        });
        if (existing) {
          Object.assign(existing, {
            ...dto,
            id_driver: existing.id_driver,
            updated_at: new Date(),
            updated_sync_at: new Date(),
          });
          const updated = await driverRepository.save(existing);
          return { ...updated, message: 'Driver ya existía, actualizado correctamente' };
        }
      }
      throw err;
    }
  }

  async findByDocument(document: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const driverRepository = dataSource.getRepository(Driver);
    return driverRepository.findOne({ where: { document_number: document } });
  }

  async updateByDocument(document: string, dto: CreateDriverDto) {
    const driver = await this.findByDocument(document);
    if (!driver) return null;

    const dataSource = await this.tenantConnection.getDataSource();
    const driverRepository = dataSource.getRepository(Driver);

    Object.assign(driver, dto, {
      updated_at: new Date(),
      updated_sync_at: new Date(),
    });
    return driverRepository.save(driver);
  }
}
