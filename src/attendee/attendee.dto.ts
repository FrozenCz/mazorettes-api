import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateAttendeeDTO {
  @Optional()
  @IsString()
  note: string;

  @IsString()
  groupUuid: string;
}
