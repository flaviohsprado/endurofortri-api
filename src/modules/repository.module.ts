import { Athlete } from '@/modules/athlete/athlete.entity';
import { TypeOrmConfigModule } from '@/services/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthleteRepository } from './athlete/athlete.repository';
import { ActivityFilter, Gear } from './gear/gear.entity';
import { GearRepository } from './gear/gear.repository';
import { Reminder } from './reminder/reminder.entity';
import { ReminderRepository } from './reminder/reminder.repository';
import { SharedEvent } from './shared-event/shared-event.entity';
import { SharedEventRepository } from './shared-event/shared-event.repository';

@Module({
   imports: [
      TypeOrmConfigModule,
      TypeOrmModule.forFeature([Athlete, SharedEvent, Reminder, ActivityFilter, Gear]),
   ],
   providers: [
      AthleteRepository,
      SharedEventRepository,
      ReminderRepository,
      GearRepository
   ],
   exports: [
      AthleteRepository,
      SharedEventRepository,
      ReminderRepository,
      GearRepository
   ],
})
export class RepositoriesModule { }
