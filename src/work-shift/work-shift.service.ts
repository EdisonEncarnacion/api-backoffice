import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { WorkShift } from './entities/work-shift.entity';

@Injectable()
export class WorkShiftService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getWorkShiftsForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const workShiftRepo = dataSource.getRepository(WorkShift);
        const query = workShiftRepo.createQueryBuilder('work_shift');

        if (since) {
            query.where('work_shift.updated_at > :since', { since });
        }

        const shifts = await query.getMany();

        return shifts.map((s) => ({
            id_work_shift: s.id_work_shift,
            shift_name: s.shift_name,
            start_time: s.start_time,
            end_time: s.end_time,
            id_local: s.id_local,
            created_at: s.created_at,
            updated_at: s.updated_at,
            state_audit: s.state_audit,
        }));
    }
}

