import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Client } from './entities/client.entity';
import { Person } from '../person/person.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { GeneralTypeService } from '../general-type/general-type.service';

@Injectable()
export class ClientService {
  constructor(
    private readonly tenantConnection: TenantConnectionProvider,
    private generalTypeService: GeneralTypeService,
  ) { }

  async getClientsForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const clientRepository = dataSource.getRepository(Client);

    const query = clientRepository.createQueryBuilder('client');

    if (since) {
      query.where('client.updated_at > :since', { since });
    }

    const clients = await query.getMany();

    return clients.map((client) => ({
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
    }));
  }

  async saveOrUpdateClientFromSync(dto: CreateClientDto) {
    try {
      const dataSource = await this.tenantConnection.getDataSource();
      const clientRepository = dataSource.getRepository(Client);

      if (dto.state === null || dto.state === undefined) {
        dto.state = 1;
      }

      let client = await clientRepository.findOne({
        where: { document_number: dto.document_number },
      });

      if (client) {
        Object.assign(client, {
          ...dto,
          id_client: client.id_client,
          updated_at: new Date(),
        });

        const updated = await clientRepository.save(client);
        return {
          ...updated,
          message: 'Cliente actualizado correctamente',
        };
      }

      const newClient = clientRepository.create({
        ...dto,
        state: dto.state ?? 1,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const saved = await clientRepository.save(newClient);
      return {
        ...saved,
        message: 'Cliente creado correctamente',
      };
    } catch (err: any) {
      if (err.code === '23505' && err.detail?.includes('document_number')) {
        const dataSource = await this.tenantConnection.getDataSource();
        const clientRepository = dataSource.getRepository(Client);

        const existing = await clientRepository.findOne({
          where: { document_number: dto.document_number },
        });

        if (existing) {
          Object.assign(existing, {
            ...dto,
            id_client: existing.id_client,
            updated_at: new Date(),
          });
          const updated = await clientRepository.save(existing);
          return {
            ...updated,
            message: 'Cliente ya existía, se actualizó correctamente',
          };
        }
      }

      throw err;
    }
  }

  async findByClientCode(code: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const clientRepository = dataSource.getRepository(Client);
    return clientRepository.findOne({ where: { client_code: code } });
  }

  async updateByClientCode(code: string, dto: CreateClientDto) {
    const dataSource = await this.tenantConnection.getDataSource();
    const clientRepository = dataSource.getRepository(Client);

    const client = await clientRepository.findOne({ where: { client_code: code } });
    if (!client) return null;

    Object.assign(client, dto, { updated_at: new Date() });
    return clientRepository.save(client);
  }

  async findByDocumentNumber(document_number: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const clientRepository = dataSource.getRepository(Client);
    return clientRepository.findOne({ where: { document_number } });
  }

  async updateByDocumentNumber(document_number: string, dto: CreateClientDto) {
    const dataSource = await this.tenantConnection.getDataSource();
    const clientRepository = dataSource.getRepository(Client);

    const client = await clientRepository.findOne({ where: { document_number } });
    if (!client) return null;

    Object.assign(client, dto, { updated_at: new Date() });
    return clientRepository.save(client);
  }
}
