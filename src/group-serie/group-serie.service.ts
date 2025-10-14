// src/group-serie/group-serie.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupSerie } from './entities/group-serie.entity';
import { CreateGroupSerieDto } from './dto/create-group-serie.dto';
import { UuidMapperService } from '../shared/uuid-mapper.service'; 
import { UpdateGroupSerieDto } from './dto/update-group-serie.dto';


@Injectable()
export class GroupSerieService {
  constructor(
    @InjectRepository(GroupSerie)
    private readonly groupSerieRepository: Repository<GroupSerie>,
    private readonly uuidMapper: UuidMapperService, 
  ) {}
   // group-serie.service.ts
async create(createDto: CreateGroupSerieDto): Promise<GroupSerie> {

  const existente = await this.groupSerieRepository.findOne({
    where: {
      description: createDto.description,
      id_local: createDto.id_local,
    },
  });

  if (existente) {
    await this.groupSerieRepository.update(existente.id_group_serie, {
      is_used: createDto.is_used,
    });
    return this.findOne(existente.id_group_serie);
  }

  const groupSerie = this.groupSerieRepository.create({
    ...createDto,
    state_audit: 'A',
  });

  return await this.groupSerieRepository.save(groupSerie);
}


  async findAll(): Promise<GroupSerie[]> {
    return await this.groupSerieRepository.find();
  }

  async findOne(id: string): Promise<GroupSerie> {
    const groupSerie = await this.groupSerieRepository.findOneBy({ id_group_serie: id });
    if (!groupSerie) {
      throw new NotFoundException(`GroupSerie con id ${id} no encontrado`);
    }
    return groupSerie;
  }
  async update(id: string, updateDto: UpdateGroupSerieDto): Promise<GroupSerie> {
  const updateData: Partial<GroupSerie> = {};

  if (updateDto.description !== undefined) {
    updateData.description = updateDto.description;
  }

  if (updateDto.is_used !== undefined) {
    updateData.is_used = updateDto.is_used;
  }

  if (updateDto.id_local !== undefined) {
    updateData.id_local = updateDto.id_local;
  }

  await this.groupSerieRepository.update(id, updateData);
  return await this.findOne(id);
}

  
  
  

  async remove(id: string): Promise<void> {
    const result = await this.groupSerieRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`GroupSerie con id ${id} no encontrado`);
    }
  }

   async findPendingSync(localId?: string): Promise<GroupSerie[]> {
  const qb = this.groupSerieRepository
    .createQueryBuilder('gs')
    .where('gs.updated_sync_at IS NULL OR gs.updated_at > gs.updated_sync_at');

  if (localId) {
    qb.andWhere('gs.id_local = :localId', { localId });
  }

  return await qb.getMany();
}

    // ...
  async updateSyncAt(id: string, updatedSyncAt: string): Promise<GroupSerie> {
    await this.groupSerieRepository.update(id, {
      updated_sync_at: new Date(updatedSyncAt),
    });
    return this.findOne(id);
  }




}
