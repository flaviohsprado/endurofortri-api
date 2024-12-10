import { Module } from '@nestjs/common';
import { TransformResponseInterceptor } from './common/interceptors/transformResponse.interceptor';
import { ActivitiesController } from './modules/activities/activities.controller';
import { ActivitiesModule } from './modules/activities/activities.module';
import { AthleteController } from './modules/athlete/athlete.controller';
import { AthleteModule } from './modules/athlete/athlete.module';

@Module({
  imports: [
    AthleteModule.register(),
    ActivitiesModule.register(),
  ],
  controllers: [
    AthleteController,
    ActivitiesController,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule { }
