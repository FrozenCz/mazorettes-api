import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../mazorettes/model';

@Entity('groups')
export class GroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  resultBy: Category;
}
