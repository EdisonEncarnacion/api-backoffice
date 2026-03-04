import { Module } from '@nestjs/common';
import { TenantModule } from '../tenant/tenant.module';
import { PaymentMethodTypeService } from './payment-method-type.service';
import { PaymentMethodTypeController } from './payment-method-type.controller';

@Module({
    imports: [TenantModule],
    controllers: [PaymentMethodTypeController],
    providers: [PaymentMethodTypeService],
    exports: [PaymentMethodTypeService],
})
export class PaymentMethodTypeModule { }
