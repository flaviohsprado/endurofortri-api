import { EnvironmentConfigModule } from '@/common/config/environment-config/environment-config.module';
import { BcryptModule } from '@/services/bcrypt/bcrypt.module';
import { BcryptService } from '@/services/bcrypt/bcrypt.service';
import { JwtConfigModule } from '@/services/jwt/jwt.module';
import { JwtTokenService } from '@/services/jwt/jwt.service';
import { MailModule } from '@/services/mail/mail.module';
import { NodemailerService } from '@/services/mail/nodemailer.service';
import { DynamicModule, Module } from '@nestjs/common';
import { AthleteRepository } from '../athlete/athlete.repository';
import { RepositoriesModule } from '../repository.module';
import { UseCaseProxy } from '../usecase-proxy';
import { ForgotPasswordUseCase } from './use-cases/forgot-password.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { ResetPasswordUseCase } from './use-cases/reset-password.usecase';

@Module({
   imports: [
      EnvironmentConfigModule,
      RepositoriesModule,
      BcryptModule,
      JwtConfigModule,
      MailModule,
   ],
})
export class AuthModule {
   static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
   static FORGOT_PASSWORD_USECASES_PROXY = 'ForgotPasswordUseCasesProxy';
   static RESET_PASSWORD_USECASES_PROXY = 'ResetPasswordUseCasesProxy';

   static register(): DynamicModule {
      return {
         module: AuthModule,
         providers: [
            {
               inject: [JwtTokenService, BcryptService, AthleteRepository],
               provide: AuthModule.LOGIN_USECASES_PROXY,
               useFactory: (jwtService: JwtTokenService, bcryptService: BcryptService, athleteRepository: AthleteRepository) =>
                  new UseCaseProxy(new LoginUseCase(jwtService, bcryptService, athleteRepository)),
            },
            {
               inject: [AthleteRepository, NodemailerService, JwtTokenService],
               provide: AuthModule.FORGOT_PASSWORD_USECASES_PROXY,
               useFactory: (athleteRepository: AthleteRepository, mailService: NodemailerService, jwtService: JwtTokenService) =>
                  new UseCaseProxy(new ForgotPasswordUseCase(athleteRepository, mailService, jwtService)),
            },
            {
               inject: [AthleteRepository, BcryptService, JwtTokenService],
               provide: AuthModule.RESET_PASSWORD_USECASES_PROXY,
               useFactory: (athleteRepository: AthleteRepository, bcryptService: BcryptService, jwtService: JwtTokenService) =>
                  new UseCaseProxy(new ResetPasswordUseCase(athleteRepository, bcryptService, jwtService)),
            },
         ],
         exports: [
            AuthModule.LOGIN_USECASES_PROXY,
            AuthModule.FORGOT_PASSWORD_USECASES_PROXY,
            AuthModule.RESET_PASSWORD_USECASES_PROXY,
         ],
      };
   }
}
