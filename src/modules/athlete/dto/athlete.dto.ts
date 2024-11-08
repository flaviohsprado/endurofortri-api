import { IsOptionalString } from "@/common/decorators/validators/isOptionalString.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"

export class AthleteDTO {
   @IsRequiredString()
   public id: string
   @IsRequiredString()
   public name: string
   @IsRequiredString()
   public profile_medium: string
   @IsRequiredString()
   public city: string
   @IsRequiredString()
   public state: string
   @IsRequiredString()
   public country: string
   @IsRequiredString()
   public timezone: string
   @IsRequiredString()
   public sex: string
   @IsRequiredString()
   public bio: string
   @IsRequiredString()
   public website: string
   @IsRequiredString()
   public email: string
}

export class CreateAthleteDTO {
   @IsRequiredString()
   public name: string
   @IsRequiredString()
   public profile_medium: string
   @IsRequiredString()
   public city: string
   @IsRequiredString()
   public state: string
   @IsRequiredString()
   public country: string
   @IsRequiredString()
   public timezone: string
   @IsRequiredString()
   public sex: string
   @IsRequiredString()
   public bio: string
   @IsRequiredString()
   public website: string
   @IsRequiredString()
   public email: string

   constructor(props: CreateAthleteDTO) {
      Object.assign(this, props);
   }
}

export class UpdateAthleteDTO {
   @IsOptionalString()
   public name?: string
   @IsOptionalString()
   public profile_medium?: string
   @IsOptionalString()
   public city?: string
   @IsOptionalString()
   public state?: string
   @IsOptionalString()
   public country?: string
   @IsOptionalString()
   public timezone?: string
   @IsOptionalString()
   public sex?: string
   @IsOptionalString()
   public bio?: string
   @IsOptionalString()
   public website?: string
   @IsOptionalString()
   public email?: string

   constructor(props: CreateAthleteDTO) {
      Object.assign(this, props);
   }
}