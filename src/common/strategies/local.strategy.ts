import { UseCaseProxy } from '@/modules/usecase-proxy';
import { AuthModule } from '@modules/auth/auth.module';
import { LoginUseCase } from '@modules/auth/use-cases/login.usecase';
import {
   BadRequestException,
   HttpStatus,
   Inject,
   Injectable,
   Logger,
   UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   private readonly logger: Logger;

   constructor(
      @Inject(AuthModule.LOGIN_USECASES_PROXY)
      private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCase>,
   ) {
      //the passport-local strategy by default expects properties called
      //username and password in the request body: 'Missing credentials error'
      super({
         passReqToCallback: true,
         usernameField: 'email',
      });

      this.logger = new Logger(LocalStrategy.name);
   }

   public async validate(email: string, password: string): Promise<any> {
      if (!email || !password) {
         this.logger.warn(
            'LocalStrategy',
            `Email or password is missing, BadRequestException`,
         );
         throw new BadRequestException({
            message: 'Email or password is missing.',
            status: HttpStatus.BAD_REQUEST,
         });
      }

      const user = await this.loginUsecaseProxy
         .getInstance()
         .execute({ email, password });

      if (!user) {
         this.logger.warn('LocalStrategy', `Invalid email or password`);

         throw new UnauthorizedException({
            message: 'Invalid email or password.',
            status: HttpStatus.UNAUTHORIZED,
         });
      }

      return user;
   }
}
