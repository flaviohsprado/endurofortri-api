import { EnvironmentConfigModule } from "@/common/config/environment-config/environment-config.module";
import { CacheConfigModule } from "@/services/cache/cache.module";
import { CacheService } from "@/services/cache/cache.service";
import { DynamicModule, Module } from "@nestjs/common";
import { RepositoriesModule } from "../repository.module";
import { UseCaseProxy } from "../usecase-proxy";
import { GearRepository } from "./gear.repository";
import { CreateGearUsecase } from "./usecases/create-gear.usecase";
import { DeleteGearUsecase } from "./usecases/delete-gear.usecase";
import { GetGearUsecase } from "./usecases/get-gear.usecase";
import { UpdateGearUsecase } from "./usecases/update-gear.usecase";

@Module({
   imports: [
      EnvironmentConfigModule,
      RepositoriesModule,
      CacheConfigModule,
   ],
})
export class GearModule {
   static GET_GEAR_USECASES_PROXY = 'getGearUsecasesProxy';
   static CREATE_GEAR_USECASES_PROXY = 'createGearUsecasesProxy';
   static UPDATE_GEAR_USECASES_PROXY = 'updateGearUsecasesProxy';
   static DELETE_GEAR_USECASES_PROXY = 'deleteGearUsecasesProxy';

   static register(): DynamicModule {
      return {
         module: GearModule,
         providers: [
            {
               inject: [GearRepository, CacheService],
               provide: GearModule.GET_GEAR_USECASES_PROXY,
               useFactory: (
                  repository: GearRepository,
                  cacheService: CacheService,
               ) =>
                  new UseCaseProxy(
                     new GetGearUsecase(repository, cacheService),
                  ),
            },
            {
               inject: [GearRepository],
               provide: GearModule.CREATE_GEAR_USECASES_PROXY,
               useFactory: (
                  repository: GearRepository,
               ) =>
                  new UseCaseProxy(
                     new CreateGearUsecase(repository),
                  ),
            },
            {
               inject: [GearRepository],
               provide: GearModule.UPDATE_GEAR_USECASES_PROXY,
               useFactory: (
                  repository: GearRepository,
               ) =>
                  new UseCaseProxy(
                     new UpdateGearUsecase(repository),
                  ),
            },
            {
               inject: [GearRepository],
               provide: GearModule.DELETE_GEAR_USECASES_PROXY,
               useFactory: (
                  repository: GearRepository,
               ) =>
                  new UseCaseProxy(
                     new DeleteGearUsecase(repository),
                  ),
            },
         ],
         exports: [
            GearModule.GET_GEAR_USECASES_PROXY,
            GearModule.CREATE_GEAR_USECASES_PROXY,
            GearModule.UPDATE_GEAR_USECASES_PROXY,
            GearModule.DELETE_GEAR_USECASES_PROXY,
         ],
      };
   }
}
