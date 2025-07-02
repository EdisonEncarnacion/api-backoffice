import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesModule } from './sales/sales.module';
import { SaleDetailsModule } from './sale-details/sale-details.module';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { SideModule } from './side/side.module';
import { CashRegisterModule } from './cash-register/cash-register.module';
import { DepositModule } from './deposit/deposit.module';


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
    ProductsModule,
    ClientsModule,
    UserAuthModule,
    SideModule,
    CashRegisterModule,
    DepositModule,
  ],
})
export class AppModule { }
