import { Controller, Get, Query } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';

@Controller('sync')
export class PaymentMethodController {
    constructor(private readonly paymentMethodService: PaymentMethodService) { }

    @Get('payment_method')
    async getPaymentMethods(@Query('since') since?: string) {
        return this.paymentMethodService.getPaymentMethodsForSync(since);
    }
}
