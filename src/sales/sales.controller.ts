import { Controller, Post, Body, Get } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { CreateSaleWithDetailsDto } from './dto/create-sale-with-details.dto';

@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService) { }

    @Post()
    create(@Body() dto: CreateSaleDto) {
        return this.salesService.create(dto);
    }

    @Post('full')
    createFullSale(@Body() dto: CreateSaleWithDetailsDto) {
        return this.salesService.createWithDetails(dto);
    }

    @Get()
    findAll() {
        return this.salesService.findAll();
    }
}
