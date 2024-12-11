import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { TransformResponseInterceptor } from './common/interceptors/transformResponse.interceptor';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { LocalStrategy } from './common/strategies/local.strategy';
import { ActivitiesController } from './modules/activities/activity.controller';
import { ActivitiesModule } from './modules/activities/activity.module';
import { AthleteController } from './modules/athlete/athlete.controller';
import { AthleteModule } from './modules/athlete/athlete.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    PassportModule,
    AthleteModule.register(),
    ActivitiesModule.register(),
    AuthModule.register(),
  ],
  controllers: [
    AthleteController,
    ActivitiesController,
    AuthController,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
