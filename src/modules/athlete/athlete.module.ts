import { EnvironmentConfigModule } from "@/common/config/environment-config/environment-config.module";
import { CacheConfigModule } from "@/services/cache/cache.module";
import { CacheService } from "@/services/cache/cache.service";
import { DynamicModule, Module } from "@nestjs/common";
import { RepositoriesModule } from "../repository.module";
import { UseCaseProxy } from "../usecase-proxy";
import { AthleteRepository } from "./athlete.repository";
import { CreateAthleteUsecase } from "./usecases/create-athlete.usecase";
import { DeleteAthleteUsecase } from "./usecases/delete-athlete.usecase";
import { GetAthleteUsecase } from "./usecases/get-athlete.usecase";
import { UpdateAthleteUsecase } from "./usecases/update-athlete.usecase";

@Module({
   imports: [
      EnvironmentConfigModule,
      RepositoriesModule,
      CacheConfigModule,
   ],
})
export class AthleteModule {
   static GET_ATHLETE_USECASES_PROXY = 'getAthleteUsecasesProxy';
   static CREATE_ATHLETE_USECASES_PROXY = 'createAthleteUsecasesProxy';
   static UPDATE_ATHLETE_USECASES_PROXY = 'updateAthleteUsecasesProxy';
   static DELETE_ATHLETE_USECASES_PROXY = 'deleteAthleteUsecasesProxy';

   static register(): DynamicModule {
      return {
         module: AthleteModule,
         providers: [
            {
               inject: [AthleteRepository, CacheService],
               provide: AthleteModule.GET_ATHLETE_USECASES_PROXY,
               useFactory: (
                  repository: AthleteRepository,
                  cacheService: CacheService,
               ) =>
                  new UseCaseProxy(
                     new GetAthleteUsecase(repository, cacheService),
                  ),
            },
            {
               inject: [AthleteRepository],
               provide: AthleteModule.CREATE_ATHLETE_USECASES_PROXY,
               useFactory: (
                  repository: AthleteRepository,
               ) =>
                  new UseCaseProxy(
                     new CreateAthleteUsecase(repository),
                  ),
            },
            {
               inject: [AthleteRepository],
               provide: AthleteModule.UPDATE_ATHLETE_USECASES_PROXY,
               useFactory: (
                  repository: AthleteRepository,
               ) =>
                  new UseCaseProxy(
                     new UpdateAthleteUsecase(repository),
                  ),
            },
            {
               inject: [AthleteRepository],
               provide: AthleteModule.DELETE_ATHLETE_USECASES_PROXY,
               useFactory: (
                  repository: AthleteRepository,
               ) =>
                  new UseCaseProxy(
                     new DeleteAthleteUsecase(repository),
                  ),
            },
         ],
         exports: [
            AthleteModule.GET_ATHLETE_USECASES_PROXY,
            AthleteModule.CREATE_ATHLETE_USECASES_PROXY,
            AthleteModule.UPDATE_ATHLETE_USECASES_PROXY,
            AthleteModule.DELETE_ATHLETE_USECASES_PROXY,
         ],
      };
   }
}
