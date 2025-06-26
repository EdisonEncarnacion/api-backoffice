import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sale)
        private readonly salesRepository: Repository<Sale>,
    ) { }

    async create(dto: CreateSaleDto) {
        try {
            const sale = this.salesRepository.create(dto);
            return await this.salesRepository.save(sale);
        } catch (error) {
            console.error('❌ Error al guardar venta:', error);
            throw error; // También puedes lanzar un HttpException si quieres personalizar la respuesta
        }
    }


    findAll() {
        return this.salesRepository.find();
    }
}
