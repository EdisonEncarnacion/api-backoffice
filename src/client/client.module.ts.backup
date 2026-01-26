// client.module.ts
import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Person } from '../person/person.entity'; 
import { GeneralTypeModule } from '../general-type/general-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Person]), 
    GeneralTypeModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
