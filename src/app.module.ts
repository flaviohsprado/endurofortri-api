import { Module } from '@nestjs/common';
import { TransformResponseInterceptor } from './common/interceptors/transformResponse.interceptor';
import { AthleteController } from './modules/athlete/athlete.controller';
import { AthleteModule } from './modules/athlete/athlete.module';
import { GearController } from './modules/gear/gear.controller';
import { GearModule } from './modules/gear/gear.module';
import { ReminderController } from './modules/reminder/reminder.controller';
import { ReminderModule } from './modules/reminder/reminder.module';
import { SharedEventController } from './modules/shared-event/shared-event.controller';
import { SharedEventModule } from './modules/shared-event/shared-event.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { ActivitiesController } from './modules/activities/activities.controller';

@Module({
  imports: [
    AthleteModule.register(),
    SharedEventModule.register(),
    GearModule.register(),
    ReminderModule.register(),
    ActivitiesModule.register(),
  ],
  controllers: [
    AthleteController,
    SharedEventController,
    GearController,
    ReminderController,
    ActivitiesController,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
