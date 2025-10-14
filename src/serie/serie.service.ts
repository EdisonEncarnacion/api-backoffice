// src/serie/serie.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from './entities/serie.entity';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UuidMapperService } from '../shared/uuid-mapper.service'; 

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(Serie)
    private readonly serieRepository: Repository<Serie>,
    private readonly uuidMapper: UuidMapperService, 
  ) {}

  async create(dto: CreateSerieDto): Promise<Serie> {
    try {
      const uuidLocal = await this.uuidMapper.mapIdToUuid('local', dto.id_local);
      if (!uuidLocal) throw new Error('No se pudo mapear id_local a UUID');
  
      const serie = this.serieRepository.create({
        ...dto,
        id_local: uuidLocal,
        correlative_start: dto.correlative_start ?? 1, 
      });
  
      const saved = await this.serieRepository.save(serie);
      return saved;
  
    } catch (error) {
      console.error('Error guardando serie en Backoffice:', error);
      throw error; 
    }
  }
  
  
  

  async findAll(): Promise<Serie[]> {
    return this.serieRepository.find();
  }

  
}
