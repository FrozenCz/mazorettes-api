import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AttendeeEntity } from './attendee.entity';
import { AttendeeService } from './attendee.service';
import { CreateAttendeeDTO } from './attendee.dto';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

@Controller('attendees')
export class AttendeeController {
  constructor(private attendeeService: AttendeeService) {}

  @Get()
  getAttendees(): Promise<AttendeeEntity[]> {
    return this.attendeeService.getAttendees();
  }

  @UseGuards(AuthGuard())
  @Put('/:startNumber')
  createAttendee(
    @Body(ValidationPipe) createAttendee: CreateAttendeeDTO,
    @Param('startNumber', ParseIntPipe) startNumber: number,
  ): Promise<AttendeeEntity> {
    return this.attendeeService.saveAttendee(startNumber, createAttendee);
  }

  @UseGuards(AuthGuard())
  @Delete('/:startNumber')
  deleteAttendee(
    @Param('startNumber', ParseIntPipe) startNumber: number,
  ): Promise<DeleteResult> {
    return this.attendeeService.deleteAttendee(startNumber);
  }
}
