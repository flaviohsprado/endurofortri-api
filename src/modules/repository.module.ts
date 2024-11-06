import { Athlete } from '@/modules/athlete/athlete.entity';
import { TypeOrmConfigModule } from '@/services/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthleteRepository } from './athlete/athlete.repository';
import { SharedEvent } from './shared-event/shared-event.entity';
import { SharedEventRepository } from './shared-event/shared-event.repository';

@Module({
   imports: [
      TypeOrmConfigModule,
      TypeOrmModule.forFeature([Athlete, SharedEvent]),
   ],
   providers: [
      AthleteRepository,
      SharedEventRepository,
   ],
   exports: [
      AthleteRepository,
      SharedEventRepository,
   ],
})
export class RepositoriesModule { }
