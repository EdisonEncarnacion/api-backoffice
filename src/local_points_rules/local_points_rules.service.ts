import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { LocalPointsRule } from './entities/local_points_rule.entity';

@Injectable()
export class LocalPointsRulesService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getLocalPointsRulesForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const ruleRepo = dataSource.getRepository(LocalPointsRule);

        const query = ruleRepo.createQueryBuilder('rule');

        if (since) {
            query.where('rule.updated_at > :since', { since });
        }

        const rules = await query.getMany();

        return rules.map((r) => ({
            id_rule: r.id_rule,
            account_type_id: r.account_type_id,
            name: r.name,
            description: r.description,
            is_active: r.is_active,
            product_id: r.product_id,
            condition_type: r.condition_type,
            min_threshold: r.min_threshold,
            points_per_unit: r.points_per_unit,
            created_at: r.created_at,
            updated_at: r.updated_at,
            state_audit: r.state_audit,
        }));
    }
}
