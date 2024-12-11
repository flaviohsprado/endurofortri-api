import { Athlete } from '@/modules/athlete/athlete.entity';
import { TypeOrmConfigModule } from '@/services/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activities/activity.entity';
import { ActivityRepository } from './activities/activity.repository';
import { AthleteRepository } from './athlete/athlete.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Athlete, Activity]),
  ],
  providers: [
    AthleteRepository,
    ActivityRepository,
  ],
  exports: [
    AthleteRepository,
    ActivityRepository,
  ],
})
export class RepositoriesModule { }
