import { ApiProperty } from "@nestjs/swagger";

export class LapPresenter {
   @ApiProperty()
   public id: string
   @ApiProperty()
   public strava_id: number
   @ApiProperty()
   public activity_id: string
   @ApiProperty()
   public resource_state: number
   @ApiProperty()
   public name: string
   @ApiProperty()
   public elapsed_time: number
   @ApiProperty()
   public moving_time: number
   @ApiProperty()
   public start_date: string
   @ApiProperty()
   public start_date_local: string
   @ApiProperty()
   public distance: number
   @ApiProperty()
   public start_index: number
   @ApiProperty()
   public end_index: number
   @ApiProperty()
   public total_elevation_gain: number
   @ApiProperty()
   public average_speed: number
   @ApiProperty()
   public max_speed: number
   @ApiProperty()
   public average_cadence: number
   @ApiProperty()
   public device_watts: boolean
   @ApiProperty()
   public average_watts: number
   @ApiProperty()
   public lap_index: number
   @ApiProperty()
   public split: number

   constructor(activity_id: string, lap: LapPresenter) {
      Object.assign(this, lap);
      this.activity_id = activity_id;
   }
}