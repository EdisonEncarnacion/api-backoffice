import { Controller, Get, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('sync')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // 🔹 GET empleados por local (Backoffice → Ventas)
  @Get('employee')
  async getEmployees(
    @Query('since') since?: string,
    @Query('local_id') local_id?: string,
  ) {
    return this.employeeService.getEmployeesForSync(since, local_id);
  }
}
