export class UpdateCorrelativeDto {
  /** UUID de la serie a actualizar */
  id_serie: string;

  /** Nuevo correlativo actual enviado desde Ventas */
  correlative_current: number;
}
