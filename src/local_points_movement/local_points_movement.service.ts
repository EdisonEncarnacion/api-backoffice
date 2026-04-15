import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { LocalPointMovement } from './entities/local_point_movement.entity';
import { LocalPoint } from '../local_points/entities/local_point.entity';
import { CreateLocalPointMovementDto } from './dto/create-local-point-movement.dto';

@Injectable()
export class LocalPointsMovementService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getLocalPointsMovementForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const movementRepo = dataSource.getRepository(LocalPointMovement);

        const query = movementRepo.createQueryBuilder('movement');

        if (since) {
            query.where('movement.updated_at > :since', { since });
        }

        const movements = await query.getMany();

        return movements.map((m) => ({
            id_local_point_movement: m.id_local_point_movement,
            local_point_id: m.local_point_id,
            sale_id: m.sale_id,
            amount: m.amount,
            quantity: m.quantity,
            balance_after: m.balance_after,
            metadata: m.metadata,
            movement_type: m.movement_type,
            created_at: m.created_at,
            updated_at: m.updated_at,
            state_audit: m.state_audit,
        }));
    }

    async saveOrUpdateLocalPointMovementFromSync(dto: CreateLocalPointMovementDto) {
        const dataSource = await this.tenantConnection.getDataSource();
        const movementRepo = dataSource.getRepository(LocalPointMovement);
        const localPointRepo = dataSource.getRepository(LocalPoint);

        // Upsert the movement record
        const existing = await movementRepo.findOne({
            where: { id_local_point_movement: dto.id_local_point_movement },
        });

        let savedMovement: LocalPointMovement;

        if (existing) {
            Object.assign(existing, { ...dto, updated_at: new Date() });
            savedMovement = await movementRepo.save(existing);
        } else {
            const newMovement = movementRepo.create({
                ...dto,
                created_at: dto.created_at ? new Date(dto.created_at) : new Date(),
                updated_at: dto.updated_at ? new Date(dto.updated_at) : new Date(),
                state_audit: dto.state_audit ?? 'A',
            });
            savedMovement = await movementRepo.save(newMovement);
        }

        // If balance_after is provided, update local_points.balance
        if (dto.balance_after !== undefined && dto.balance_after !== null && dto.local_point_id) {
            const localPoint = await localPointRepo.findOne({
                where: { id_local_point: dto.local_point_id },
            });

            if (localPoint) {
                localPoint.balance = dto.balance_after;
                localPoint.updated_at = new Date();
                await localPointRepo.save(localPoint);
            }
        }

        return {
            ...savedMovement,
            message: existing
                ? 'Movimiento actualizado correctamente'
                : 'Movimiento creado correctamente',
        };
    }
}
