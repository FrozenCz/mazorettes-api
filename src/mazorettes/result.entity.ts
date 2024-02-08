import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './model';

@Entity('results')
export class ResultEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  refereeNumber: number;

  @Column()
  ordNumber: number;

  @Column()
  note: string;

  @Column()
  category: Category;

  @Column()
  costumes: number;

  @Column()
  choreography: number;

  @Column()
  formationChange: number;

  @Column()
  music: number;

  @Column()
  facialExpression: number;

  @Column()
  difficulty: number;

  @Column()
  faults: number;

  @Column()
  overall: number;

  @Column()
  synchro: number;
}
