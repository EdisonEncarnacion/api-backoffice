// person-address.module.ts
import { Module } from '@nestjs/common';
import { PersonAddressService } from './person-address.service';
import { PersonAddressController } from './person-address.controller';

@Module({
  controllers: [PersonAddressController],
  providers: [PersonAddressService],
  exports: [PersonAddressService],
})
export class PersonAddressModule {}
