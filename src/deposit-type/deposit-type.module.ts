import { Module } from '@nestjs/common';
import { TenantModule } from '../tenant/tenant.module';
import { DepositTypeService } from './deposit-type.service';
import { DepositTypeController } from './deposit-type.controller';

@Module({
    imports: [TenantModule],
    controllers: [DepositTypeController],
    providers: [DepositTypeService],
    exports: [DepositTypeService],
})
export class DepositTypeModule { }
