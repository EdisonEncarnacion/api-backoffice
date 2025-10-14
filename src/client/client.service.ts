import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, MoreThan } from 'typeorm';
import { Client } from './entities/client.entity';
import { Person } from '../person/person.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { GeneralTypeService } from '../general-type/general-type.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,

    @InjectRepository(Person)
    private personRepository: Repository<Person>,

    private generalTypeService: GeneralTypeService,
  ) {}

  async getClientsForSync() {
    const clients = await this.clientRepository
      .createQueryBuilder('client')
      .where('client.updated_sync_at IS NULL')
      .orWhere('client.updated_at > client.updated_sync_at')
      .getMany();
  
    return clients.map(client => ({
      id_client: client.id_client,
      client_code: client.client_code,
      first_name: client.first_name,
      last_name: client.last_name,
      document_number: client.document_number,
      phone_number: client.phone_number,
      email: client.email,
      date_of_birth: client.date_of_birth,
      origin_branch_id: client.origin_branch_id,
      created_at: client.created_at,
      updated_at: client.updated_at,
      state: client.state,
      document_type_id: client.document_type_id,
      updated_sync_at: client.updated_sync_at,
    }));
  }
  

  async saveOrUpdateClientFromSync(dto: CreateClientDto) {
    const existing = await this.clientRepository.findOne({
      where: { id_client: dto.id_client },
    });

    if (existing) {
      Object.assign(existing, {
        ...dto,
        updated_at: new Date(),
        updated_sync_at: new Date(),
      });
      return await this.clientRepository.save(existing);
    }

    const newClient = this.clientRepository.create({
      ...dto,
      created_at: new Date(),
      updated_at: new Date(),
      updated_sync_at: new Date(),
    });

    return await this.clientRepository.save(newClient);
  }

  async findByClientCode(code: string) {
    return this.clientRepository.findOne({ where: { client_code: code } });
  }

  async updateByClientCode(code: string, dto: CreateClientDto) {
    const client = await this.clientRepository.findOne({ where: { client_code: code } });
    if (!client) return null;

    Object.assign(client, dto, { updated_at: new Date() });
    return this.clientRepository.save(client);
  }
}
