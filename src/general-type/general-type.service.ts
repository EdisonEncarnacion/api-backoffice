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

  // Mapeo manual entre id_document_type de Ventas y general_type.id en Backoffice
  private documentTypeMap: Record<number, number> = {
    1: 3, // Ventas 1 (DNI)  → Backoffice 3
    2: 4, // Ventas 2 (RUC)  → Backoffice 4
    3: 5, // Ventas 3 (CE)   → Backoffice 5
  };

  private documentTypeReverseMap: Record<number, number> = {
    3: 1, // Backoffice 3 → Ventas 1 (DNI)
    4: 2, // Backoffice 4 → Ventas 2 (RUC)
    5: 3, // Backoffice 5 → Ventas 3 (CE)
  };

  /**
   * Convierte un id_document_type de Ventas al id real de Backoffice
   */
  async mapPersonDocumentTypeId(fromVentasId: number): Promise<number> {
    const mappedId = this.documentTypeMap[fromVentasId];
    if (!mappedId) {
      throw new NotFoundException(
        `❌ No hay mapeo para document_type_id=${fromVentasId} de Ventas → Backoffice`,
      );
    }
    return mappedId;
  }

  /**
   * Convierte un id_document_type de Backoffice al id equivalente en Ventas
   */
  async mapPersonDocumentTypeIdToVentas(fromBackofficeId: number): Promise<number> {
    const mappedId = this.documentTypeReverseMap[fromBackofficeId];
    if (!mappedId) {
      throw new NotFoundException(
        `❌ No hay mapeo para document_type_id=${fromBackofficeId} de Backoffice → Ventas`,
      );
    }
    return mappedId;
  }

  // --- Validadores genéricos ---
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
