import { EnvironmentConfigModule } from '@/common/config/environment-config/environment-config.module';
import { CacheConfigModule } from '@/services/cache/cache.module';
import { CacheService } from '@/services/cache/cache.service';
import { StravaModule } from '@/services/strava/strava.module';
import { StravaService } from '@/services/strava/strava.service';
import { DynamicModule, Module } from '@nestjs/common';
import { AthleteRepository } from '../athlete/athlete.repository';
import { RepositoriesModule } from '../repository.module';
import { UseCaseProxy } from '../usecase-proxy';
import { ActivityRepository } from './activity.repository';
import { CreateActivityUsecase } from './usecases/create-activity.usecase';
import { DeleteActivityUsecase } from './usecases/delete-activity.usecase';
import { GetActivityLapUsecase } from './usecases/get-activity-lap.usecase';
import { GetActivityUsecase } from './usecases/get-activity.usecase';
import { UpdateActivityUsecase } from './usecases/update-activity.usecase';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule, CacheConfigModule, StravaModule],
})
export class ActivitiesModule {
  static GET_ACTIVITY_USECASES_PROXY = 'getActivityUsecasesProxy';
  static CREATE_ACTIVITY_USECASES_PROXY = 'createActivityUsecasesProxy';
  static UPDATE_ACTIVITY_USECASES_PROXY = 'updateActivityUsecasesProxy';
  static DELETE_ACTIVITY_USECASES_PROXY = 'deleteActivityUsecasesProxy';
  static GET_ACTIVITY_LAP_USECASES_PROXY = 'getActivityLapUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: ActivitiesModule,
      providers: [
        {
          inject: [ActivityRepository, AthleteRepository, StravaService, CacheService],
          provide: ActivitiesModule.GET_ACTIVITY_USECASES_PROXY,
          useFactory: (
            repository: ActivityRepository,
            athleteRepository: AthleteRepository,
            stravaService: StravaService,
            cacheService: CacheService,
          ) =>
            new UseCaseProxy(new GetActivityUsecase(repository, athleteRepository, stravaService, cacheService)),
        },
        {
          inject: [ActivityRepository],
          provide: ActivitiesModule.CREATE_ACTIVITY_USECASES_PROXY,
          useFactory: (repository: ActivityRepository) =>
            new UseCaseProxy(new CreateActivityUsecase(repository)),
        },
        {
          inject: [ActivityRepository],
          provide: ActivitiesModule.UPDATE_ACTIVITY_USECASES_PROXY,
          useFactory: (repository: ActivityRepository) =>
            new UseCaseProxy(new UpdateActivityUsecase(repository)),
        },
        {
          inject: [ActivityRepository],
          provide: ActivitiesModule.DELETE_ACTIVITY_USECASES_PROXY,
          useFactory: (repository: ActivityRepository) =>
            new UseCaseProxy(new DeleteActivityUsecase(repository)),
        },
        {
          inject: [ActivityRepository, CacheService, StravaService],
          provide: ActivitiesModule.GET_ACTIVITY_LAP_USECASES_PROXY,
          useFactory: (repository: ActivityRepository, cacheService: CacheService, stravaService: StravaService) =>
            new UseCaseProxy(new GetActivityLapUsecase(repository, cacheService, stravaService)),
        },
      ],
      exports: [
        ActivitiesModule.GET_ACTIVITY_USECASES_PROXY,
        ActivitiesModule.CREATE_ACTIVITY_USECASES_PROXY,
        ActivitiesModule.UPDATE_ACTIVITY_USECASES_PROXY,
        ActivitiesModule.DELETE_ACTIVITY_USECASES_PROXY,
        ActivitiesModule.GET_ACTIVITY_LAP_USECASES_PROXY,
      ],
    };
  }
}
