export class CreateSerieDto {
    id_serie: number;
    series_number: string;
    description: string;
    is_active: boolean;
    correlative_current: number;
    id_sale_document_type: number;
    id_local: string;
    correlative_start?: number = 1;
  }
  