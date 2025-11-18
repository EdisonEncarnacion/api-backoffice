// src/driver/driver.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async getDriversForSync(since?: string) {
    const query = this.driverRepository.createQueryBuilder('driver');

    if (since) {
      query.where('driver.updated_at > :since', { since });
    } else {
      query.where('driver.updated_sync_at IS NULL')
           .orWhere('driver.updated_at > driver.updated_sync_at');
    }

    const drivers = await query.getMany();

    return drivers.map(d => ({
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
      if (dto.state === null || dto.state === undefined) {
        dto.state = 1;
      }

      const existing = await this.driverRepository.findOne({
        where: { document_number: dto.document_number },
      });

      if (existing) {
        Object.assign(existing, {
          ...dto,
          id_driver: existing.id_driver,
          updated_at: new Date(),
          updated_sync_at: new Date(),
        });
        const updated = await this.driverRepository.save(existing);
        return { ...updated, message: 'Driver actualizado correctamente' };
      }

      const newDriver = this.driverRepository.create({
        ...dto,
        state: dto.state ?? 1,
        created_at: new Date(),
        updated_at: new Date(),
        updated_sync_at: new Date(),
      });
      const saved = await this.driverRepository.save(newDriver);
      return { ...saved, message: 'Driver creado correctamente' };

    } catch (err: any) {
      if (err.code === '23505' && err.detail?.includes('document_number')) {
        const existing = await this.driverRepository.findOne({
          where: { document_number: dto.document_number },
        });
        if (existing) {
          Object.assign(existing, {
            ...dto,
            id_driver: existing.id_driver,
            updated_at: new Date(),
            updated_sync_at: new Date(),
          });
          const updated = await this.driverRepository.save(existing);
          return { ...updated, message: 'Driver ya existía, actualizado correctamente' };
        }
      }
      throw err;
    }
  }

  async findByDocument(document: string) {
    return this.driverRepository.findOne({ where: { document_number: document } });
  }

  async updateByDocument(document: string, dto: CreateDriverDto) {
    const driver = await this.findByDocument(document);
    if (!driver) return null;

    Object.assign(driver, dto, {
      updated_at: new Date(),
      updated_sync_at: new Date(),
    });
    return this.driverRepository.save(driver);
  }
}
