import { Module } from '@nestjs/common';
import { MazorettesController } from './mazorettes.controller';
import { MazorettesService } from './mazorettes.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MazorettesController],
  providers: [MazorettesService],
})
export class MazorettesModule {}
