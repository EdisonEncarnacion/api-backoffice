import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SalesModule } from './sales/sales.module';
import { CashRegisterModule } from './cash-register/cash-register.module'; // ✅ Agregado
import { DepositModule } from './deposit/deposit.module'; // ✅ Agregado

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development', // ✅ Cambia según tu entorno
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
    CashRegisterModule, // ✅ ahora estará disponible
    DepositModule       // ✅ ahora estará disponible
  ],
})
export class AppModule {}
