import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('person')
export class Person {
  @PrimaryColumn('uuid')
  id_person: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  id: number;

}
