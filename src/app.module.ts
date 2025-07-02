import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesModule } from './sales/sales.module';
import { SaleDetailsModule } from './sale-details/sale-details.module';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { SideModule } from './side/side.module';
import { CashRegisterModule } from './cash-register/cash-register.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
  ],
})
export class AppModule { }
