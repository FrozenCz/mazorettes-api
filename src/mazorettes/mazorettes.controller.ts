import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('mazorettes')
export class MazorettesController {
  @Get()
  @UseGuards(AuthGuard())
  getResults() {
    return 'test';
  }
}
