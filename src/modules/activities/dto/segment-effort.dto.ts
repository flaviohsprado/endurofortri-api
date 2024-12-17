
import { IsOptionalArray } from "@/common/decorators/validators/isOptionalArray.decorator"
import { IsOptionalBoolean } from "@/common/decorators/validators/isOptionalBoolean.decorator"
import { IsOptionalNumber } from "@/common/decorators/validators/isOptionalNumber.decorator"
import { IsOptionalObject } from "@/common/decorators/validators/isOptionalObject.decorator"
import { IsRequiredBoolean } from "@/common/decorators/validators/isRequiredBoolean.decorator"
import { IsRequiredNumber } from "@/common/decorators/validators/isRequiredNumber.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"
import { AthleteDTO } from "@/modules/athlete/dto/athlete.dto"
import { ActivityDTO } from "./activity.dto"
import { SegmentDTO } from "./sement.dto"

export class SegmentEffortDTO {
   @IsRequiredNumber()
   public id: number

   @IsRequiredNumber()
   public resource_state: number

   @IsRequiredString()
   public name: string

   @IsOptionalObject({ type: ActivityDTO })
   public activity: ActivityDTO

   @IsOptionalObject({ type: AthleteDTO })
   public athlete: AthleteDTO

   @IsRequiredNumber()
   public elapsed_time: number

   @IsRequiredNumber()
   public moving_time: number

   @IsRequiredString()
   public start_date: string

   @IsRequiredString()
   public start_date_local: string

   @IsRequiredNumber()
   public distance: number

   @IsRequiredNumber()
   public start_index: number

   @IsRequiredNumber()
   public end_index: number

   @IsRequiredNumber()
   public average_cadence: number

   @IsRequiredBoolean()
   public device_watts: boolean

   @IsRequiredNumber()
   public average_watts: number

   @IsOptionalObject({ type: SegmentDTO })
   public segment: SegmentDTO

   @IsOptionalNumber()
   public kom_rank: any

   @IsOptionalNumber()
   public pr_rank: any

   @IsOptionalArray({ type: Array<any> })
   public achievements: any[]

   @IsOptionalBoolean()
   public hidden: boolean

   constructor(data: SegmentEffortDTO) {
      this.id = data.id
      this.resource_state = data.resource_state
      this.name = data.name
      this.activity = data.activity
      this.athlete = data.athlete
      this.elapsed_time = data.elapsed_time
      this.moving_time = data.moving_time
      this.start_date = data.start_date
      this.start_date_local = data.start_date_local
      this.distance = data.distance
      this.start_index = data.start_index
      this.end_index = data.end_index
      this.average_cadence = data.average_cadence
      this.device_watts = data.device_watts
      this.average_watts = data.average_watts
      this.segment = data.segment
      this.kom_rank = data.kom_rank
      this.pr_rank = data.pr_rank
      this.achievements = data.achievements
      this.hidden = data.hidden
   }
}
