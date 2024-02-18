import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { GroupEntity } from '../groups/group.entity';

@Entity('attendees')
export class AttendeeEntity extends BaseEntity {
  @PrimaryColumn()
  startNumber: number;

  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => GroupEntity, (group) => group.uuid, { eager: false })
  group: GroupEntity;
  @Column()
  groupUuid: string;
}
