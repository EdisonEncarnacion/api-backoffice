import { Controller, Post, Body, Get } from '@nestjs/common';
import { SaleDetailsService } from './sale-details.service';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';

@Controller('sale-details')
export class SaleDetailsController {
    constructor(private readonly saleDetailsService: SaleDetailsService) { }

    @Post()
    create(@Body() dto: CreateSaleDetailDto) {
        return this.saleDetailsService.create(dto);
    }

    @Get()
    findAll() {
        return this.saleDetailsService.findAll();
    }
}
