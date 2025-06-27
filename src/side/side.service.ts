import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Side } from './entities/side.entity';

@Injectable()
export class SideService {
    constructor(
        @InjectRepository(Side)
        private readonly sideRepository: Repository<Side>,
    ) { }

    findAll(): Promise<Side[]> {
        return this.sideRepository.find();
    }
}
