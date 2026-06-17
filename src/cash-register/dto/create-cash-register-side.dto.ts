import {
  IsInt,
  IsUUID,
  IsOptional,
  IsString,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateCashRegisterSideDto {
  /**
   * Código numérico del lado en la BD ventas  (cash_register_side.id_cash_register_side)
   * Se usa para deduplicar: si ya existe una fila con este código en el local
   * indicado, se actualiza; si no, se crea.
   */
  @IsInt()
  id_cash_register_side: number;

  /**
   * Código numérico de la caja en ventas (cash_register_side.id_cash_register)
   * El servicio buscará el UUID correspondiente en backoffice usando
   * cash_register_code + id_local.
   */
  @IsInt()
  id_cash_register: number;

  /**
   * Código numérico del lado en ventas (cash_register_side.id_side)
   * El servicio buscará el UUID correspondiente usando migration_sync_id.
   */
  @IsInt()
  id_side: number;

  /** Estado del registro */
  @IsInt()
  state: number;

  /** UUID del local (viene del sincronizador ya como UUID) */
  @IsUUID()
  id_local: string;

  @IsOptional()
  @IsDateString()
  created_at?: string;

  @IsOptional()
  @IsDateString()
  updated_at?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1)
  state_audit?: string | null;
}
