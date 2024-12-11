import { IsOptionalString } from '@/common/decorators/validators/isOptionalString.decorator';
import { IsRequiredString } from '@decorators/validators/isRequiredString.decorator';

export class AuthPresenter {
   @IsRequiredString()
   public id: string;

   @IsRequiredString()
   public email: string;

   @IsRequiredString()
   public name: string;

   @IsRequiredString()
   public access_token: string;

   @IsOptionalString()
   public strava_access_token: string;

   constructor(auth: AuthPresenter) {
      this.id = auth.id;
      this.email = auth.email;
      this.name = auth.name;
      this.access_token = auth.access_token;
      this.strava_access_token = auth.strava_access_token;
   }
}

