import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';

@Module({
    imports: [],
    controllers: [PaymentMethodController],
    providers: [PaymentMethodService],
})
export class PaymentMethodModule { }
