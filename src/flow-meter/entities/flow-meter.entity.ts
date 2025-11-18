import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("flow_meter")
export class FlowMeter {
  @PrimaryColumn("uuid")
  id: string;

  @Column("uuid")
  side_id: string;

  @Column("uuid")
  id_cash_register: string;

  @Column("int")
  product_id: number;

  @Column("float")
  initial_cm: number;

  @Column("float")
  final_cm: number;

  @Column("uuid")
  local_id: string;

  @Column("timestamp")
  created_at: Date;

  @Column("timestamp", { nullable: true })
  updated_at: Date | null;

  @Column({ type: "char", length: 1, nullable: true })
  state_audit: string | null;

  @Column("uuid")
  hose_id: string;
}
