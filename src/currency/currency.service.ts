import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getCurrenciesForSync() {
        const dataSource = await this.tenantConnection.getDataSource();
        const currencyRepo = dataSource.getRepository(Currency);
        const currencies = await currencyRepo.find();

        return currencies.map((c) => ({
            id_currency: c.id_currency,
            currency_code: c.currency_code,
            currency_type: c.currency_type,
            simple_description: c.simple_description,
            complete_description: c.complete_description,
            exchangeRate: c.exchangeRate,
        }));
    }
}

