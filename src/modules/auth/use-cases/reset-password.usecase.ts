import { AthleteRepository } from '@/modules/athlete/athlete.repository';
import { BcryptService } from '@/services/bcrypt/bcrypt.service';
import { JwtTokenService } from '@/services/jwt/jwt.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ResetPasswordDTO } from '../presenters/auth.dto';

@Injectable()
export class ResetPasswordUseCase {
   private readonly logger: Logger;

   constructor(
      private readonly athleteRepository: AthleteRepository,
      private readonly bcryptService: BcryptService,
      private readonly jwtService: JwtTokenService,
   ) {
      this.logger = new Logger(ResetPasswordUseCase.name);
   }

   public async execute(request: ResetPasswordDTO): Promise<void> {
      try {
         // Verify and decode the reset token
         const decoded = this.jwtService.verifyToken(request.resetToken);

         // Hash the new password
         const hashedPassword = await this.bcryptService.createHash(request.newPassword);

         // Update the user's password
         await this.athleteRepository.update(decoded.id, { password: hashedPassword });

         this.logger.log(`Password reset successful for user ${decoded.email}`);
      } catch (error) {
         this.logger.error('Password reset failed', error);
         throw new UnauthorizedException({
            message: 'Invalid or expired reset token.',
            status: 401,
         });
      }
   }
} 