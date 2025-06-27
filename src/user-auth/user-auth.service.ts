import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuth } from './entities/user-auth.entity';

@Injectable()
export class UserAuthService {
    constructor(
        @InjectRepository(UserAuth)
        private readonly userAuthRepository: Repository<UserAuth>,
    ) { }

    findAll(): Promise<UserAuth[]> {
        return this.userAuthRepository.find();
    }
}
