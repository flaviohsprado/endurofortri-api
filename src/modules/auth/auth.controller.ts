import { Public } from '@decorators/isPublicRoute.decorator';
import { Body, Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostApiResponse } from '../../common/decorators/requests/postApiResponse.decorator';
import { UseCaseProxy } from '../usecase-proxy';
import { AuthModule } from './auth.module';
import { AuthDTO } from './presenters/auth.dto';
import { AuthPresenter } from './presenters/auth.presenter';
import { LoginUseCase } from './use-cases/login.usecase';

@ApiTags('Authentication')
@Controller('public/auth')
export class AuthController {
   constructor(
      @Inject(AuthModule.LOGIN_USECASES_PROXY)
      private readonly loginUseCase: UseCaseProxy<LoginUseCase>
   ) { }

   @Public()
   @PostApiResponse(AuthPresenter, 'login', false)
   public async login(
      @Body() authCredentials: AuthDTO,
   ): Promise<AuthPresenter> {
      const credentials = new AuthDTO(authCredentials);
      return this.loginUseCase.getInstance().execute(credentials);
   }
}
