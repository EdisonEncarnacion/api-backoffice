import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getEmployeesForSync(since?: string, local_id?: string) {
    if (!local_id) return [];

    const dataSource = await this.tenantConnection.getDataSource();
    const employeeRepository = dataSource.getRepository(Employee);

    const query = employeeRepository
      .createQueryBuilder('e')
      .innerJoin('user_auth', 'u', 'u.id_user = e.id_user')
      .innerJoin('user_local', 'ul', 'ul.user_auth_id = u.id_user')
      .where('ul.local_id = :local_id', { local_id });

    if (since) {
      query.andWhere('e.updated_at > :since', { since });
    }

    const employees = await query.getMany();

    return employees.map((e) => ({
      id_employee: e.id_employee,
      first_name: e.first_name,
      last_name: e.last_name,
      document_number: e.document_number,
      phone_number: e.phone_number,
      email: e.email,
      state: e.state,
      id_user: e.id_user,
      updated_at: e.updated_at,
    }));
  }
}
