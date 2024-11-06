import { ApiProperty } from "@nestjs/swagger"

export class ReminderPresenter {
   @ApiProperty()
   public id: string
   @ApiProperty()
   public gear_id: string
   @ApiProperty()
   public name: string
   @ApiProperty()
   public distance: number
   @ApiProperty()
   public time: number
   @ApiProperty()
   public activities: number
   @ApiProperty()
   public days: number
   @ApiProperty()
   public last_reset: Date
   @ApiProperty()
   public starting_distance: number
   @ApiProperty()
   public starting_time: number
   @ApiProperty()
   public starting_activities: number
   @ApiProperty()
   public snoozed_until: Date
   @ApiProperty()
   public percent_used: number
   @ApiProperty()
   public distance_used: number
   @ApiProperty()
   public time_used: number
   @ApiProperty()
   public activities_used: number
   @ApiProperty()
   public days_used: number

   constructor(props: ReminderPresenter) {
      Object.assign(this, props)
   }
}