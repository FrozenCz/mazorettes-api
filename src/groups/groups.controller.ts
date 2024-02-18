import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupEntity } from './group.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateGroupDTO } from './group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private groupService: GroupsService) {}

  @Get()
  getGroups(): Promise<GroupEntity[]> {
    return this.groupService.getGroups();
  }

  @UseGuards(AuthGuard())
  @Post()
  createGroup(
    @Body(ValidationPipe) createGroup: CreateGroupDTO,
  ): Promise<GroupEntity> {
    return this.groupService.createGroup(createGroup);
  }

  @UseGuards(AuthGuard())
  @Put('/:uuid')
  saveGroup(
    @Param('uuid') uuid: string,
    @Body(ValidationPipe)
    saveGroup: CreateGroupDTO,
  ): Promise<GroupEntity> {
    return this.groupService.saveGroup(saveGroup, uuid);
  }

  @UseGuards(AuthGuard())
  @Delete('/:uuid')
  deleteGroup(@Param('uuid') uuid: string): Promise<GroupEntity> {
    return this.groupService.delete(uuid);
  }
}
