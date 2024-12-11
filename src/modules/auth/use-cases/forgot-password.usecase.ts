import { AthleteRepository } from '@/modules/athlete/athlete.repository';
import { JwtTokenService } from '@/services/jwt/jwt.service';
import { NodemailerService } from '@/services/mail/nodemailer.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ForgotPasswordDTO } from '../presenters/auth.dto';

@Injectable()
export class ForgotPasswordUseCase {
   private readonly logger: Logger;

   constructor(
      private readonly athleteRepository: AthleteRepository,
      private readonly mailService: NodemailerService,
      private readonly jwtService: JwtTokenService,
   ) {
      this.logger = new Logger(ForgotPasswordUseCase.name);
   }

   public async execute(request: ForgotPasswordDTO): Promise<void> {
      const athlete = await this.athleteRepository.findByKey('email', request.email);

      if (!athlete) {
         throw new NotFoundException({
            message: 'Email incorrect',
            status: 404,
         });
      }

      // Generate a reset token that expires in 10 minutes
      const resetToken = this.jwtService.createToken(
         { id: athlete.id, email: athlete.email, name: athlete.name },
         '10m'
      );

      // Send reset password email
      await this.mailService.sendMail(
         athlete.email,
         'Password Reset Request',
         'You have requested to reset your password. Please use the code below to reset your password. This code will expire in 10 minutes.',
         resetToken
      );

      this.logger.log(`Password reset email sent to ${athlete.email}`);
   }
} 