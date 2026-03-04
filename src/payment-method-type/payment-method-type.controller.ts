import { Controller, Get, Query } from '@nestjs/common';
import { PaymentMethodTypeService } from './payment-method-type.service';

@Controller('sync')
export class PaymentMethodTypeController {
    constructor(private readonly paymentMethodTypeService: PaymentMethodTypeService) { }

    @Get('payment-method-type')
    async getPaymentMethodTypes(@Query('since') since?: string) {
        return this.paymentMethodTypeService.getPaymentMethodTypesForSync(since);
    }
}
