import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { LocalPoint } from './entities/local_point.entity';
import { CreateLocalPointDto } from './dto/create-local-point.dto';

@Injectable()
export class LocalPointsService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getLocalPointsForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const localPointRepository = dataSource.getRepository(LocalPoint);

        const query = localPointRepository.createQueryBuilder('local_point');

        if (since) {
            query.where('local_point.updated_at > :since', { since });
        }

        const localPoints = await query.getMany();

        return localPoints.map((lp) => ({
            id_local_point: lp.id_local_point,
            client_id: lp.client_id,
            balance: lp.balance,
            created_at: lp.created_at,
            updated_at: lp.updated_at,
            state_audit: lp.state_audit,
        }));
    }

    async saveOrUpdateLocalPointFromSync(dto: CreateLocalPointDto) {
        try {
            const dataSource = await this.tenantConnection.getDataSource();
            const localPointRepository = dataSource.getRepository(LocalPoint);

            const existing = await localPointRepository.findOne({
                where: { id_local_point: dto.id_local_point },
            });

            if (existing) {
                Object.assign(existing, {
                    ...dto,
                    updated_at: new Date(),
                });
                const updated = await localPointRepository.save(existing);
                return { ...updated, message: 'Local point actualizado correctamente' };
            }

            const newLocalPoint = localPointRepository.create({
                ...dto,
                created_at: dto.created_at ? new Date(dto.created_at) : new Date(),
                updated_at: dto.updated_at ? new Date(dto.updated_at) : new Date(),
                state_audit: dto.state_audit ?? 'A',
            });

            const saved = await localPointRepository.save(newLocalPoint);
            return { ...saved, message: 'Local point creado correctamente' };
        } catch (err: any) {
            if (err.code === '23505' && err.detail?.includes('id_local_point')) {
                const dataSource = await this.tenantConnection.getDataSource();
                const localPointRepository = dataSource.getRepository(LocalPoint);

                const existing = await localPointRepository.findOne({
                    where: { id_local_point: dto.id_local_point },
                });
                if (existing) {
                    Object.assign(existing, {
                        ...dto,
                        updated_at: new Date(),
                    });
                    const updated = await localPointRepository.save(existing);
                    return { ...updated, message: 'Local point ya existía, actualizado correctamente' };
                }
            }
            throw err;
        }
    }
}
