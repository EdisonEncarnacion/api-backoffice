// src/client/client.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';
import { Person } from '../person/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Person])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
