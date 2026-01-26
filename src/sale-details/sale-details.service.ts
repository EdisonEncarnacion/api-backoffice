import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { SaleDetail } from './sale-detail.entity';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';

@Injectable()
export class SaleDetailsService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async create(dto: CreateSaleDetailDto) {
        const dataSource = await this.tenantConnection.getDataSource();
        const saleDetailsRepository = dataSource.getRepository(SaleDetail);
        const detail = saleDetailsRepository.create(dto);
        return saleDetailsRepository.save(detail);
    }

    async findAll() {
        const dataSource = await this.tenantConnection.getDataSource();
        const saleDetailsRepository = dataSource.getRepository(SaleDetail);
        return saleDetailsRepository.find();
    }
}

