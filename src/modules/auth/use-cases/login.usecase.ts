import { Athlete } from '@/modules/athlete/athlete.entity';
import { AthleteRepository } from '@/modules/athlete/athlete.repository';
import { BcryptService } from '@/services/bcrypt/bcrypt.service';
import { JwtTokenService } from '@/services/jwt/jwt.service';
import { HttpStatus, Logger, NotFoundException } from '@nestjs/common';
import { AuthDTO } from '../presenters/auth.dto';
import { AuthPresenter } from '../presenters/auth.presenter';

export class LoginUseCase {
   private readonly logger: Logger;

   constructor(
      private readonly jwtService: JwtTokenService,
      private readonly bcryptService: BcryptService,
      private readonly athleteRepository: AthleteRepository,
   ) {
      this.logger = new Logger(LoginUseCase.name);
   }

   public async execute(credentials: AuthDTO): Promise<AuthPresenter> {
      const athleteValidated: Omit<Athlete, 'password' | 'createdAt' | 'updatedAt'> =
         await this.validateAthlete(credentials.email, credentials.password);

      if (!athleteValidated)
         throw new NotFoundException({
            message: 'Athlete not found!',
            status: HttpStatus.NOT_FOUND,
         });

      const access_token = this.jwtService.createToken({
         id: athleteValidated.id,
         email: athleteValidated.email,
         name: athleteValidated.name,
      });

      this.logger.log(`LoginUseCases execute()`, `Athlete have been logged in!`);

      return new AuthPresenter({
         id: athleteValidated.id,
         email: athleteValidated.email,
         name: athleteValidated.name,
         access_token,
         strava_access_token: athleteValidated.strava_access_token,
      });
   }

   public async validateAthlete(
      email: string,
      password: string,
   ): Promise<Omit<Athlete, 'password'>> {
      const athlete = await this.athleteRepository.findByKey('email', email);

      if (!athlete)
         throw new NotFoundException({
            message: 'Athlete not found!',
            status: HttpStatus.NOT_FOUND,
         });

      const isValidPassword = await this.bcryptService.checkHash(
         password,
         athlete.password,
      );

      if (isValidPassword) {
         delete athlete.password;

         return athlete;
      }
   }
}
