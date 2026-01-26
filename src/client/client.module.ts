// client.module.ts
import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { GeneralTypeModule } from '../general-type/general-type.module';

@Module({
  imports: [GeneralTypeModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule { }
