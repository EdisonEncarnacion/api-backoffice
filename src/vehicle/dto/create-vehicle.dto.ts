export class CreateVehicleDto {
  id_vehicle?: string;
  vehicle_plate: string;
  vehicle_code?: string | null;
  mileage?: number;
  created_at?: Date;
  updated_at?: Date;
  updated_sync_at?: Date;
  state_audit?: string; 
}
