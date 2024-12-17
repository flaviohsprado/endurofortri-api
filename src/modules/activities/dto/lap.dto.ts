import { IsOptionalBoolean } from "@/common/decorators/validators/isOptionalBoolean.decorator"
import { IsOptionalNumber } from "@/common/decorators/validators/isOptionalNumber.decorator"
import { IsOptionalObject } from "@/common/decorators/validators/isOptionalObject.decorator"
import { IsOptionalString } from "@/common/decorators/validators/isOptionalString.decorator"
import { IsRequiredNumber } from "@/common/decorators/validators/isRequiredNumber.decorator"
import { ActivityDTO, ResourceStateDTO } from "./activity.dto"

export class LapDTO {
   @IsRequiredNumber()
   public id: number

   @IsOptionalNumber()
   public resource_state: number

   @IsOptionalString()
   public name: string

   @IsOptionalObject({ type: ActivityDTO })
   public activity: ActivityDTO

   @IsOptionalObject({ type: ResourceStateDTO })
   public athlete: ResourceStateDTO

   @IsOptionalNumber()
   public elapsed_time: number

   @IsOptionalNumber()
   public moving_time: number

   @IsOptionalString()
   public start_date: string

   @IsOptionalString()
   public start_date_local: string

   @IsOptionalNumber()
   public distance: number

   @IsOptionalNumber()
   public start_index: number

   @IsOptionalNumber()
   public end_index: number

   @IsOptionalNumber()
   public total_elevation_gain: number

   @IsOptionalNumber()
   public average_speed: number

   @IsOptionalNumber()
   public max_speed: number

   @IsOptionalNumber()
   public average_cadence: number

   @IsOptionalBoolean()
   public device_watts: boolean

   @IsOptionalNumber()
   public average_watts: number

   @IsOptionalNumber()
   public lap_index: number

   @IsOptionalNumber()
   public split: number
}