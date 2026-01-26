import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getVehiclesForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const vehicleRepository = dataSource.getRepository(Vehicle);

    const query = vehicleRepository.createQueryBuilder('vehicle');

    if (since) {
      query.where('vehicle.updated_at > :since', { since });
    } else {
      query
        .where('vehicle.updated_sync_at IS NULL')
        .orWhere('vehicle.updated_at > vehicle.updated_sync_at');
    }

    const vehicles = await query.getMany();

    return vehicles.map((v) => ({
      id_vehicle: v.id_vehicle,
      vehicle_plate: v.vehicle_plate,
      vehicle_code: v.vehicle_code,
      mileage: v.mileage,
      created_at: v.created_at,
      updated_at: v.updated_at,
      updated_sync_at: v.updated_sync_at,
      state_audit: v.state_audit,
    }));
  }

  async saveOrUpdateVehicleFromSync(dto: CreateVehicleDto) {
    try {
      const dataSource = await this.tenantConnection.getDataSource();
      const vehicleRepository = dataSource.getRepository(Vehicle);

      const existing = await vehicleRepository.findOne({
        where: { vehicle_plate: dto.vehicle_plate },
      });

      if (existing) {
        Object.assign(existing, {
          ...dto,
          id_vehicle: existing.id_vehicle,
          updated_at: new Date(),
          updated_sync_at: new Date(),
        });
        const updated = await vehicleRepository.save(existing);
        return { ...updated, message: 'Vehículo actualizado correctamente' };
      }

      const newVehicle = vehicleRepository.create({
        ...dto,
        created_at: new Date(),
        updated_at: new Date(),
        updated_sync_at: new Date(),
        state_audit: dto.state_audit ?? 'A',
      });

      const saved = await vehicleRepository.save(newVehicle);
      return { ...saved, message: 'Vehículo creado correctamente' };
    } catch (err: any) {
      if (err.code === '23505' && err.detail?.includes('vehicle_plate')) {
        const dataSource = await this.tenantConnection.getDataSource();
        const vehicleRepository = dataSource.getRepository(Vehicle);

        const existing = await vehicleRepository.findOne({
          where: { vehicle_plate: dto.vehicle_plate },
        });
        if (existing) {
          Object.assign(existing, {
            ...dto,
            id_vehicle: existing.id_vehicle,
            updated_at: new Date(),
            updated_sync_at: new Date(),
          });
          const updated = await vehicleRepository.save(existing);
          return { ...updated, message: 'Vehículo ya existía, actualizado correctamente' };
        }
      }
      throw err;
    }
  }
}
