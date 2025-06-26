import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleDetail } from './sale-detail.entity';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';

@Injectable()
export class SaleDetailsService {
    constructor(
        @InjectRepository(SaleDetail)
        private readonly saleDetailsRepository: Repository<SaleDetail>,
    ) { }

    async create(dto: CreateSaleDetailDto) {
        const detail = this.saleDetailsRepository.create(dto);
        return this.saleDetailsRepository.save(detail);
    }

    findAll() {
        return this.saleDetailsRepository.find();
    }
}
