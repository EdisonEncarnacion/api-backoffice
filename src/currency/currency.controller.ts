import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('sync')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) { }

    @Get('currency')
    async getCurrencies() {
        return this.currencyService.getCurrenciesForSync();
    }
}
