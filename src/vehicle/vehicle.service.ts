import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async getVehiclesForSync(since?: string) {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');

    if (since) {
      query.where('vehicle.updated_at > :since', { since });
    } else {
      query
        .where('vehicle.updated_sync_at IS NULL')
        .orWhere('vehicle.updated_at > vehicle.updated_sync_at');
    }

    const vehicles = await query.getMany();

    return vehicles.map(v => ({
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
      const existing = await this.vehicleRepository.findOne({
        where: { vehicle_plate: dto.vehicle_plate },
      });

      if (existing) {
        Object.assign(existing, {
          ...dto,
          id_vehicle: existing.id_vehicle,
          updated_at: new Date(),
          updated_sync_at: new Date(),
        });
        const updated = await this.vehicleRepository.save(existing);
        return { ...updated, message: 'Vehículo actualizado correctamente' };
      }

      const newVehicle = this.vehicleRepository.create({
        ...dto,
        created_at: new Date(),
        updated_at: new Date(),
        updated_sync_at: new Date(),
        state_audit: dto.state_audit ?? 'A',
      });

      const saved = await this.vehicleRepository.save(newVehicle);
      return { ...saved, message: 'Vehículo creado correctamente' };

    } catch (err: any) {
      if (err.code === '23505' && err.detail?.includes('vehicle_plate')) {
        const existing = await this.vehicleRepository.findOne({
          where: { vehicle_plate: dto.vehicle_plate },
        });
        if (existing) {
          Object.assign(existing, {
            ...dto,
            id_vehicle: existing.id_vehicle,
            updated_at: new Date(),
            updated_sync_at: new Date(),
          });
          const updated = await this.vehicleRepository.save(existing);
          return { ...updated, message: 'Vehículo ya existía, actualizado correctamente' };
        }
      }
      throw err;
    }
  }
}
