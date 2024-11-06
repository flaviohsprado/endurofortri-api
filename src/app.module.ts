import { Module } from '@nestjs/common';
import { TransformResponseInterceptor } from './common/interceptors/transformResponse.interceptor';
import { AthleteController } from './modules/athlete/athlete.controller';
import { AthleteModule } from './modules/athlete/athlete.module';
import { SharedEventController } from './modules/shared-event/shared-event.controller';
import { SharedEventModule } from './modules/shared-event/shared-event.module';

@Module({
  imports: [
    AthleteModule.register(),
    SharedEventModule.register(),
  ],
  controllers: [
    AthleteController,
    SharedEventController,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule { }
