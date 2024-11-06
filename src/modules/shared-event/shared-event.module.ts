import { EnvironmentConfigModule } from "@/common/config/environment-config/environment-config.module";
import { CacheConfigModule } from "@/services/cache/cache.module";
import { CacheService } from "@/services/cache/cache.service";
import { DynamicModule, Module } from "@nestjs/common";
import { RepositoriesModule } from "../repository.module";
import { UseCaseProxy } from "../usecase-proxy";
import { SharedEventRepository } from "./shared-event.repository";
import { CreateSharedEventUsecase } from "./usecases/create-shared-event.usecase";
import { DeleteSharedEventUsecase } from "./usecases/delete-shared-event.usecase";
import { GetSharedEventUsecase } from "./usecases/get-shared-event.usecase";
import { UpdateSharedEventUsecase } from "./usecases/update-shared-event.usecase";

@Module({
   imports: [
      EnvironmentConfigModule,
      RepositoriesModule,
      CacheConfigModule,
   ],
})
export class SharedEventModule {
   static GET_SHARED_EVENT_USECASES_PROXY = 'getSharedEventUsecasesProxy';
   static CREATE_SHARED_EVENT_USECASES_PROXY = 'createSharedEventUsecasesProxy';
   static UPDATE_SHARED_EVENT_USECASES_PROXY = 'updateSharedEventUsecasesProxy';
   static DELETE_SHARED_EVENT_USECASES_PROXY = 'deleteSharedEventUsecasesProxy';

   static register(): DynamicModule {
      return {
         module: SharedEventModule,
         providers: [
            {
               inject: [SharedEventRepository, CacheService],
               provide: SharedEventModule.GET_SHARED_EVENT_USECASES_PROXY,
               useFactory: (
                  repository: SharedEventRepository,
                  cacheService: CacheService,
               ) =>
                  new UseCaseProxy(
                     new GetSharedEventUsecase(repository, cacheService),
                  ),
            },
            {
               inject: [SharedEventRepository],
               provide: SharedEventModule.CREATE_SHARED_EVENT_USECASES_PROXY,
               useFactory: (
                  repository: SharedEventRepository,
               ) =>
                  new UseCaseProxy(
                     new CreateSharedEventUsecase(repository),
                  ),
            },
            {
               inject: [SharedEventRepository],
               provide: SharedEventModule.UPDATE_SHARED_EVENT_USECASES_PROXY,
               useFactory: (
                  repository: SharedEventRepository,
               ) =>
                  new UseCaseProxy(
                     new UpdateSharedEventUsecase(repository),
                  ),
            },
            {
               inject: [SharedEventRepository],
               provide: SharedEventModule.DELETE_SHARED_EVENT_USECASES_PROXY,
               useFactory: (
                  repository: SharedEventRepository,
               ) =>
                  new UseCaseProxy(
                     new DeleteSharedEventUsecase(repository),
                  ),
            },
         ],
         exports: [
            SharedEventModule.GET_SHARED_EVENT_USECASES_PROXY,
            SharedEventModule.CREATE_SHARED_EVENT_USECASES_PROXY,
            SharedEventModule.UPDATE_SHARED_EVENT_USECASES_PROXY,
            SharedEventModule.DELETE_SHARED_EVENT_USECASES_PROXY,
         ],
      };
   }
}
