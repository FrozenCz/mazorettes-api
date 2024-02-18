import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupEntity } from './group.entity';
import { CreateGroupDTO } from './group.dto';

@Injectable()
export class GroupsService {
  getGroups(): Promise<GroupEntity[]> {
    return GroupEntity.find({ order: { name: 'ASC' } });
  }

  createGroup(createGroup: CreateGroupDTO) {
    const newGroup = new GroupEntity();
    newGroup.name = createGroup.name;
    newGroup.resultBy = createGroup.resultBy;

    return newGroup.save();
  }

  async saveGroup(createGroup: CreateGroupDTO, uuid: string) {
    const group = await GroupEntity.findOne({ where: { uuid } });
    if (!group) {
      throw new NotFoundException(`Group with uuid ${uuid} not found`);
    }
    group.name = createGroup.name;
    group.resultBy = createGroup.resultBy;

    return group.save();
  }

  async delete(uuid: string) {
    const group = await GroupEntity.findOne({ where: { uuid } });
    if (!group) {
      throw new NotFoundException(`Group with uuid ${uuid} not found`);
    }

    // todo: pokud tam jsou ucastnici, tak nesmi jit odebrat
    return group.remove();
  }
}
