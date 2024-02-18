import { IsInt, IsString } from 'class-validator';
import { Category } from '../mazorettes/model';

export class CreateGroupDTO {
  @IsString()
  name: string;

  @IsInt()
  resultBy: Category;
}
