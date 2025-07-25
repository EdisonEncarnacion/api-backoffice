import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { Person } from '../person/person.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,

    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async getClientsForSync() {
    const clients = await this.clientRepository.find({
      relations: ['person'],
    });

    return clients.map(client => ({
      id_client: client.id_client,
      client_code: client.client_code,
      first_name: client.first_name,
      last_name: client.last_name,
      document_number: client.document_number,
      telphone_number: client.telphone_number,
      email: client.email,
      state: client.state,
      date_of_birth: client.date_of_birth,
      created_at: client.created_at,
      updated_at: client.updated_at,
      updated_sync_at: client.updated_sync_at,
      id_document_type: client.id_document_type,
      id_person_type: client.id_person_type,
      id_person: client.id_person,

     
    }));
  }

  async saveOrUpdateClientFromSync(dto: CreateClientDto) {
    const existing = await this.clientRepository.findOne({
      where: { client_code: dto.client_code },
    });

    if (existing) {
      Object.assign(existing, {
        ...dto,
        updated_sync_at: new Date(),
      });
      return await this.clientRepository.save(existing);
    }

    // Crear persona si no existe
    let person = await this.personRepository.findOne({
      where: { id_person: dto.id_person },
    });

    if (!person) {
      person = this.personRepository.create({
        id_person: dto.id_person,
        first_name: dto.first_name,
        last_name: dto.last_name,
  
      });
      await this.personRepository.save(person);
    }

    const newClient = this.clientRepository.create({
      ...dto,
      updated_sync_at: new Date(),
    });

    return await this.clientRepository.save(newClient);
  }
}
