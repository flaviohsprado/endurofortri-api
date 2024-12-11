import { MinLength } from 'class-validator';
import { IsRequiredString } from '../../../common/decorators/validators/isRequiredString.decorator';

export class AuthDTO {
   @IsRequiredString()
   public email: string;

   @IsRequiredString()
   public password: string;

   constructor(props: AuthDTO) {
      Object.assign(this, props);
   }
}

export class ForgotPasswordDTO {
   @IsRequiredString()
   public email: string;

   constructor(partial: Partial<ForgotPasswordDTO>) {
      Object.assign(this, partial);
   }
}

export class ResetPasswordDTO {
   @IsRequiredString()
   public resetToken: string;

   @IsRequiredString({ message: 'New password is required' })
   @MinLength(6, { message: 'New password must be at least 6 characters long' })
   public newPassword: string;

   constructor(partial: Partial<ResetPasswordDTO>) {
      Object.assign(this, partial);
   }
} 