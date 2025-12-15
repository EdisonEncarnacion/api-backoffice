import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
    constructor(
        @InjectRepository(Currency)
        private readonly currencyRepo: Repository<Currency>,
    ) { }

    async getCurrenciesForSync() {
        const currencies = await this.currencyRepo.find();

        return currencies.map(c => ({
            id_currency: c.id_currency,
            currency_code: c.currency_code,
            currency_type: c.currency_type,
            simple_description: c.simple_description,
            complete_description: c.complete_description,
            exchangeRate: c.exchangeRate,
        }));
    }
}
