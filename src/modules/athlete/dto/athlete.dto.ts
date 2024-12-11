import { IsOptionalNumber } from "@/common/decorators/validators/isOptionalNumber.decorator"
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
   @IsOptionalNumber()
   public weight: number
   @IsOptionalNumber()
   public height: number
}

export class CreateAthleteDTO {
   @IsRequiredString()
   public name: string
   @IsRequiredString()
   public email: string
   @IsRequiredString()
   public password: string
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
   @IsOptionalNumber()
   public weight?: number
   @IsOptionalNumber()
   public height?: number

   constructor(props: CreateAthleteDTO) {
      Object.assign(this, props);
   }
}

export class UpdateAthleteDTO {
   @IsOptionalString()
   public name?: string
   @IsOptionalString()
   public email?: string
   @IsOptionalString()
   public password?: string
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
   @IsOptionalNumber()
   public weight?: number
   @IsOptionalNumber()
   public height?: number

   constructor(props: CreateAthleteDTO) {
      Object.assign(this, props);
   }
}