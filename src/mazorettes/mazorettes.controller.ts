import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResultValidation } from './mazorettes.dto';
import { MazorettesService } from './mazorettes.service';
import { GetReferee } from '../utils/get-referee.decorator';
import { Assignee } from './model';

@Controller('mazorettes')
export class MazorettesController {
  constructor(private mazoretteService: MazorettesService) {}

  @Get()
  getResults(): Promise<Assignee[]> {
    return this.mazoretteService.getAssignees();
  }

  @UseGuards(AuthGuard())
  @Post()
  sendResults(
    @GetReferee() refereeNumber: number,
    @Body(ValidationPipe)
    resultValidation: ResultValidation,
  ): Promise<void> {
    return this.mazoretteService.setResults({
      ...resultValidation,
      refereeNumber,
    });
  }
}
