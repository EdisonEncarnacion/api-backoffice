import { Controller, Post, Body, Get } from '@nestjs/common';
import { StockService } from './stock.service';
import { UpdateStockDto } from './stock.dto';

@Controller('sync/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  async updateStock(@Body() dto: UpdateStockDto) {
    return this.stockService.updateStock(dto);
  }


  @Get()
  async findPendingStockSync() {
    const stocks = await this.stockService.findPendingStockSync();
    return stocks;
  }
  
}
