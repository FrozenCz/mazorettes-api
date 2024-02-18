import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MazorettesModule } from './mazorettes/mazorettes.module';
import { GroupsModule } from './groups/groups.module';
import { AttendeeModule } from './attendee/attendee.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env.${process.env.STAGE}`] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: +configService.get<number>('PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        schema: configService.get('DATABASE_SCHEMA'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('SYNC'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    MazorettesModule,
    GroupsModule,
    AttendeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
