import { ApiProperty } from "@nestjs/swagger"

export class LapDTO {
   @ApiProperty()
   public id?: string
   @ApiProperty()
   public strava_id: number
   @ApiProperty()
   public activity_id: string
   @ApiProperty()
   public strava_activity_id: number
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

   constructor(lap: LapDTO) {
      this.id = lap.id
      this.strava_id = lap.strava_id
      this.activity_id = lap.activity_id
      this.strava_activity_id = lap.strava_activity_id
      this.resource_state = lap.resource_state
      this.name = lap.name
      this.elapsed_time = lap.elapsed_time
      this.moving_time = lap.moving_time
      this.start_date = lap.start_date
      this.start_date_local = lap.start_date_local
      this.distance = lap.distance
      this.start_index = lap.start_index
      this.end_index = lap.end_index
      this.total_elevation_gain = lap.total_elevation_gain
      this.average_speed = lap.average_speed
      this.max_speed = lap.max_speed
      this.average_cadence = lap.average_cadence
      this.device_watts = lap.device_watts
      this.average_watts = lap.average_watts
      this.lap_index = lap.lap_index
      this.split = lap.split
   }
}
