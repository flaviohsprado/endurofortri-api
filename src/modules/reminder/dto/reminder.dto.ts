import { IsOptionalDate } from "@/common/decorators/validators/isOptionalDate.decorator"
import { IsOptionalNumber } from "@/common/decorators/validators/isOptionalNumber.decorator"
import { IsOptionalString } from "@/common/decorators/validators/isOptionalString.decorator"
import { IsRequiredDate } from "@/common/decorators/validators/isRequiredDate.decorator"
import { IsRequiredNumber } from "@/common/decorators/validators/isRequiredNumber.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"

export class CreateReminderDTO {
   @IsOptionalString()
   public gear_id?: string
   @IsRequiredString()
   public name: string
   @IsRequiredNumber()
   public distance: number
   @IsRequiredNumber()
   public time: number
   @IsRequiredNumber()
   public activities: number
   @IsRequiredNumber()
   public days: number
   @IsRequiredDate()
   public last_reset: Date
   @IsRequiredNumber()
   public starting_distance: number
   @IsRequiredNumber()
   public starting_time: number
   @IsRequiredNumber()
   public starting_activities: number
   @IsRequiredDate()
   public snoozed_until: Date
   @IsRequiredNumber()
   public percent_used: number
   @IsRequiredNumber()
   public distance_used: number
   @IsRequiredNumber()
   public time_used: number
   @IsRequiredNumber()
   public activities_used: number
   @IsRequiredNumber()
   public days_used: number

   constructor(props: CreateReminderDTO, gearId?: string) {
      Object.assign(this, props)
      this.gear_id = gearId
   }
}

export class UpdateReminderDTO {
   @IsOptionalString()
   public gear_id?: string
   @IsOptionalString()
   public name?: string
   @IsOptionalNumber()
   public distance?: number
   @IsOptionalNumber()
   public time?: number
   @IsOptionalNumber()
   public activities?: number
   @IsOptionalNumber()
   public days?: number
   @IsOptionalDate()
   public last_reset?: Date
   @IsOptionalNumber()
   public starting_distance?: number
   @IsOptionalNumber()
   public starting_time?: number
   @IsOptionalNumber()
   public starting_activities?: number
   @IsOptionalDate()
   public snoozed_until?: Date
   @IsOptionalNumber()
   public percent_used?: number
   @IsOptionalNumber()
   public distance_used?: number
   @IsOptionalNumber()
   public time_used?: number
   @IsOptionalNumber()
   public activities_used?: number
   @IsOptionalNumber()
   public days_used?: number

   constructor(props: CreateReminderDTO) {
      Object.assign(this, props)
   }
}