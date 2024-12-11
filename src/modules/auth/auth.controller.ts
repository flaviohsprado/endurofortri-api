import { Public } from '@decorators/isPublicRoute.decorator';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostApiResponse } from '../../common/decorators/requests/postApiResponse.decorator';
import { UseCaseProxy } from '../usecase-proxy';
import { AuthModule } from './auth.module';
import { AuthDTO, ForgotPasswordDTO, ResetPasswordDTO } from './presenters/auth.dto';
import { AuthPresenter } from './presenters/auth.presenter';
import { ForgotPasswordUseCase } from './use-cases/forgot-password.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { ResetPasswordUseCase } from './use-cases/reset-password.usecase';

@ApiTags('Authentication')
@Controller('public/auth')
export class AuthController {
   constructor(
      @Inject(AuthModule.LOGIN_USECASES_PROXY)
      private readonly loginUseCase: UseCaseProxy<LoginUseCase>,
      @Inject(AuthModule.FORGOT_PASSWORD_USECASES_PROXY)
      private readonly forgotPasswordUseCase: UseCaseProxy<ForgotPasswordUseCase>,
      @Inject(AuthModule.RESET_PASSWORD_USECASES_PROXY)
      private readonly resetPasswordUseCase: UseCaseProxy<ResetPasswordUseCase>
   ) { }

   @Public()
   @PostApiResponse(AuthPresenter, 'login', false)
   public async login(
      @Body() authCredentials: AuthDTO,
   ): Promise<AuthPresenter> {
      const credentials = new AuthDTO(authCredentials);
      return this.loginUseCase.getInstance().execute(credentials);
   }

   @Public()
   @Post('forgot-password')
   @PostApiResponse(null, 'forgot-password', false)
   public async forgotPassword(
      @Body() forgotPasswordDto: ForgotPasswordDTO,
   ): Promise<void> {
      const request = new ForgotPasswordDTO(forgotPasswordDto);
      return this.forgotPasswordUseCase.getInstance().execute(request);
   }

   @Public()
   @Post('reset-password')
   @PostApiResponse(null, 'reset-password', false)
   public async resetPassword(
      @Body() resetPasswordDto: ResetPasswordDTO,
   ): Promise<void> {
      const request = new ResetPasswordDTO(resetPasswordDto);
      return this.resetPasswordUseCase.getInstance().execute(request);
   }
}
