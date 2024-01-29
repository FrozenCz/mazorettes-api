import { Controller, Get } from '@nestjs/common';
@Controller('mazorettes')
export class MazorettesController {
  @Get()
  getResults() {
    return 'test';
  }
}
