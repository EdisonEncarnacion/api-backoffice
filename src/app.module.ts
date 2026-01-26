// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Tenant Module
import { TenantModule } from './tenant/tenant.module';
import { TenantMiddleware } from './tenant/tenant.middleware';

// Business Modules
import { SalesModule } from './sales/sales.module';
import { CashRegisterModule } from './cash-register/cash-register.module';
import { DepositModule } from './deposit/deposit.module';
import { SideModule } from './side/side.module';
import { ClientModule } from './client/client.module';
import { FlowMeterModule } from './flow-meter/flow-meter.module';
import { GeneralTypeModule } from './general-type/general-type.module';
import { PaymentsModule } from './payments/payments.module';
import { TransactionControllerModule } from './transaction-controller/transaction-controller.module';
import { SerieModule } from './serie/serie.module';
import { GroupSerieModule } from './group-serie/group-serie.module';
import { DriverModule } from './driver/driver.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { AccountTypeModule } from './account-type/account-type.module';
import { AccountCardTypeModule } from './account-card-type/account-card-type.module';
import { AccountModule } from './account/account.module';
import { AccountProductModule } from './account-product/account-product.module';
import { AccountCardModule } from './account-card/account-card.module';
import { MovementTypeModule } from './movement-type/movement-type.module';
import { ProductModule } from './product/product.module';
import { ProductLocalModule } from './product-local/product-local.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { MovementModule } from './movement/movement.module';
import { TankModule } from './tank/tank.module';
import { AccountCardProductModule } from './account-card-product/account-card-product.module';
import { HoseModule } from './hose/hose.module';
import { BankModule } from './bank/bank.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { CurrencyModule } from './currency/currency.module';
import { AuthorizationCodeModule } from './authorization-code/authorization-code.module';
import { RoleModule } from './role/role.module';
import { ModuleModule } from './module/module.module';
import { RoleAccessModule } from './role-access/role-access.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),

    // Tenant Module (Master DB)
    TenantModule,

    // Business Modules
    SalesModule,
    CashRegisterModule,
    DepositModule,
    SideModule,
    ClientModule,
    FlowMeterModule,
    GeneralTypeModule,
    PaymentsModule,
    TransactionControllerModule,
    SerieModule,
    ProductModule,
    ProductLocalModule,
    GroupSerieModule,
    DriverModule,
    VehicleModule,
    AccountTypeModule,
    AccountCardTypeModule,
    AccountModule,
    AccountProductModule,
    AccountCardModule,
    MovementTypeModule,
    UserModule,
    EmployeeModule,
    MovementModule,
    TankModule,
    AccountCardProductModule,
    HoseModule,
    BankModule,
    BankAccountModule,
    CurrencyModule,
    AuthorizationCodeModule,
    RoleModule,
    ModuleModule,
    RoleAccessModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}

