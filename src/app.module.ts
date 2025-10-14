// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SalesModule } from './sales/sales.module';
import { CashRegisterModule } from './cash-register/cash-register.module';
import { DepositModule } from './deposit/deposit.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SideModule } from './side/side.module'; 
import { ClientModule } from './client/client.module';
import { FlowMeterModule } from './flow-meter/flow-meter.module';
import { GeneralTypeModule } from './general-type/general-type.module';
import { PaymentsModule } from './payments/payments.module';
import { TransactionControllerModule } from './transaction-controller/transaction-controller.module';
import { SerieModule } from './serie/serie.module';
import { ProductModule } from './product/product.module';
import { StockModule } from './product/stock/stock.module';
import { GroupSerieModule } from './group-serie/group-serie.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),

    SalesModule,
    CashRegisterModule,
    DepositModule,
    UsuariosModule,
    SideModule,
    ClientModule,
    FlowMeterModule,
    GeneralTypeModule,
    PaymentsModule,
    TransactionControllerModule,
    SerieModule,
    ProductModule, 
    StockModule, GroupSerieModule,  

  ],
})
export class AppModule {}
