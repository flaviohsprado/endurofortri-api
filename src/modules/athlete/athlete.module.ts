import { EnvironmentConfigModule } from "@/common/config/environment-config/environment-config.module";
import { BcryptModule } from "@/services/bcrypt/bcrypt.module";
import { BcryptService } from "@/services/bcrypt/bcrypt.service";
import { CacheConfigModule } from "@/services/cache/cache.module";
import { CacheService } from "@/services/cache/cache.service";
import { JwtConfigModule } from "@/services/jwt/jwt.module";
import { JwtTokenService } from "@/services/jwt/jwt.service";
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
      BcryptModule,
      JwtConfigModule,
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
               inject: [AthleteRepository, BcryptService, JwtTokenService],
               provide: AthleteModule.CREATE_ATHLETE_USECASES_PROXY,
               useFactory: (
                  repository: AthleteRepository,
                  bcryptService: BcryptService,
                  jwtTokenService: JwtTokenService,
               ) =>
                  new UseCaseProxy(
                     new CreateAthleteUsecase(repository, bcryptService, jwtTokenService),
                  ),
            },
            {
               inject: [AthleteRepository, BcryptService],
               provide: AthleteModule.UPDATE_ATHLETE_USECASES_PROXY,
               useFactory: (
                  repository: AthleteRepository,
                  bcryptService: BcryptService,
               ) =>
                  new UseCaseProxy(
                     new UpdateAthleteUsecase(repository, bcryptService),
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
