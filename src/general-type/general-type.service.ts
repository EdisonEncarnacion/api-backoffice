import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralType } from './entities/general-type.entity';

@Injectable()
export class GeneralTypeService {
  constructor(
    @InjectRepository(GeneralType)
    private readonly repo: Repository<GeneralType>,
  ) {}


  async validatePersonDocumentTypeId(id: number): Promise<void> {
    await this.validateGeneralTypeId(id, 'person_document_type', 'document_type_id');
  }

  async validateAccountTypeId(id: number): Promise<void> {
    await this.validateGeneralTypeId(id, 'account_type', 'account_type_id');
  }

  async validateAccountCardTypeId(id: number): Promise<void> {
    await this.validateGeneralTypeId(id, 'account_card_type', 'account_card_type_id');
  }

  async validateAnyGeneralTypeId(id: number, fieldName = 'general_type_id'): Promise<void> {
    await this.validateGeneralTypeId(id, undefined, fieldName);
  }

  private async validateGeneralTypeId(
    id: number,
    category?: string,
    fieldName = 'general_type_id',
  ): Promise<void> {
    const whereCondition: any = { id, state_audit: 'A' };

    if (category) {
      whereCondition.category = category;
    }

    const exists = await this.repo.findOne({ where: whereCondition });

    if (!exists) {
      if (category) {
        throw new NotFoundException(
          `El ${fieldName} ${id} no existe o no es válido para la categoría '${category}'`,
        );
      } else {
        throw new NotFoundException(
          `El ${fieldName} ${id} no existe o está inactivo en general_type`,
        );
      }
    }
  }
}
