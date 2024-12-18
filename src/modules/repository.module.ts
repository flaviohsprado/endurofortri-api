import { Athlete } from '@/modules/athlete/athlete.entity';
import { TypeOrmConfigModule } from '@/services/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityRepository } from './activities/activity.repository';
import { Activity } from './activities/entities/activity.entity';
import { Lap } from './activities/entities/lap.entity';
import { AthleteRepository } from './athlete/athlete.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Athlete, Activity, Lap]),
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
