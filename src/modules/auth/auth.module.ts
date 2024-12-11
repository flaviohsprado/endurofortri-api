import { EnvironmentConfigModule } from '@/common/config/environment-config/environment-config.module';
import { BcryptModule } from '@/services/bcrypt/bcrypt.module';
import { BcryptService } from '@/services/bcrypt/bcrypt.service';
import { JwtConfigModule } from '@/services/jwt/jwt.module';
import { JwtTokenService } from '@/services/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';
import { AthleteRepository } from '../athlete/athlete.repository';
import { RepositoriesModule } from '../repository.module';
import { UseCaseProxy } from '../usecase-proxy';
import { LoginUseCase } from './use-cases/login.usecase';

@Module({
   imports: [
      EnvironmentConfigModule,
      RepositoriesModule,
      BcryptModule,
      JwtConfigModule,
   ],
})
export class AuthModule {
   static LOGIN_USECASES_PROXY = 'login';

   static register(): DynamicModule {
      return {
         module: AuthModule,
         providers: [
            {
               inject: [
                  JwtTokenService,
                  BcryptService,
                  AthleteRepository,
               ],
               provide: AuthModule.LOGIN_USECASES_PROXY,
               useFactory: (
                  jwtService: JwtTokenService,
                  bcryptService: BcryptService,
                  athleteRepository: AthleteRepository,
               ) =>
                  new UseCaseProxy(
                     new LoginUseCase(
                        jwtService,
                        bcryptService,
                        athleteRepository,
                     ),
                  ),
            }
         ],
         exports: [
            AuthModule.LOGIN_USECASES_PROXY,
         ],
      };
   }
}
