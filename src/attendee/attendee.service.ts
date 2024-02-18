import { Injectable, NotFoundException } from '@nestjs/common';
import { AttendeeEntity } from './attendee.entity';
import { CreateAttendeeDTO } from './attendee.dto';
import { GroupEntity } from '../groups/group.entity';
import { ResultEntity } from '../mazorettes/result.entity';

@Injectable()
export class AttendeeService {
  getAttendees() {
    return AttendeeEntity.find({ order: { startNumber: 'ASC' } });
  }

  async saveAttendee(startNumber: number, createAttendee: CreateAttendeeDTO) {
    let group;
    let attendee;

    try {
      group = await GroupEntity.findOneByOrFail({
        uuid: createAttendee.groupUuid,
      });
    } catch (e) {
      throw new NotFoundException(
        `Group id ${createAttendee.groupUuid} not found!`,
      );
    }

    attendee = await AttendeeEntity.findOne({ where: { startNumber } });
    if (!attendee) {
      attendee = await new AttendeeEntity();
    }
    attendee.startNumber = startNumber;
    attendee.groupUuid = group.uuid;
    attendee.note = createAttendee.note;

    return attendee.save();
  }

  async deleteAttendee(startNumber: number) {
    try {
      await ResultEntity.delete({ ordNumber: startNumber });
    } catch (e) {
      console.log(e);
    }

    return AttendeeEntity.delete({ startNumber });
  }
}
