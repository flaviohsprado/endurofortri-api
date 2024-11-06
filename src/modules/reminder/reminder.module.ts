import { EnvironmentConfigModule } from "@/common/config/environment-config/environment-config.module";
import { CacheConfigModule } from "@/services/cache/cache.module";
import { CacheService } from "@/services/cache/cache.service";
import { DynamicModule, Module } from "@nestjs/common";
import { RepositoriesModule } from "../repository.module";
import { UseCaseProxy } from "../usecase-proxy";
import { ReminderRepository } from "./reminder.repository";
import { CreateReminderUsecase } from "./usecases/create-reminder.usecase";
import { DeleteReminderUsecase } from "./usecases/delete-reminder.usecase";
import { GetReminderUsecase } from "./usecases/get-reminder.usecase";
import { UpdateReminderUsecase } from "./usecases/update-reminder.usecase";

@Module({
   imports: [
      EnvironmentConfigModule,
      RepositoriesModule,
      CacheConfigModule,
   ],
})
export class ReminderModule {
   static GET_REMINDER_USECASES_PROXY = 'getReminderUsecasesProxy';
   static CREATE_REMINDER_USECASES_PROXY = 'createReminderUsecasesProxy';
   static UPDATE_REMINDER_USECASES_PROXY = 'updateReminderUsecasesProxy';
   static DELETE_REMINDER_USECASES_PROXY = 'deleteReminderUsecasesProxy';

   static register(): DynamicModule {
      return {
         module: ReminderModule,
         providers: [
            {
               inject: [ReminderRepository, CacheService],
               provide: ReminderModule.GET_REMINDER_USECASES_PROXY,
               useFactory: (
                  repository: ReminderRepository,
                  cacheService: CacheService,
               ) =>
                  new UseCaseProxy(
                     new GetReminderUsecase(repository, cacheService),
                  ),
            },
            {
               inject: [ReminderRepository],
               provide: ReminderModule.CREATE_REMINDER_USECASES_PROXY,
               useFactory: (
                  repository: ReminderRepository,
               ) =>
                  new UseCaseProxy(
                     new CreateReminderUsecase(repository),
                  ),
            },
            {
               inject: [ReminderRepository],
               provide: ReminderModule.UPDATE_REMINDER_USECASES_PROXY,
               useFactory: (
                  repository: ReminderRepository,
               ) =>
                  new UseCaseProxy(
                     new UpdateReminderUsecase(repository),
                  ),
            },
            {
               inject: [ReminderRepository],
               provide: ReminderModule.DELETE_REMINDER_USECASES_PROXY,
               useFactory: (
                  repository: ReminderRepository,
               ) =>
                  new UseCaseProxy(
                     new DeleteReminderUsecase(repository),
                  ),
            },
         ],
         exports: [
            ReminderModule.GET_REMINDER_USECASES_PROXY,
            ReminderModule.CREATE_REMINDER_USECASES_PROXY,
            ReminderModule.UPDATE_REMINDER_USECASES_PROXY,
            ReminderModule.DELETE_REMINDER_USECASES_PROXY,
         ],
      };
   }
}
