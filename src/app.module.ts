import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesModule } from './sales/sales.module';
import { SaleDetailsModule } from './sale-details/sale-details.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'backoffice',
      synchronize: false,
      autoLoadEntities: true,
    }),
    SalesModule,
    SaleDetailsModule,
  ],
})
export class AppModule { }
