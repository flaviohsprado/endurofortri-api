import { AthletePresenter } from "@/modules/athlete/dto/athlete.presenter"
import { ApiProperty } from "@nestjs/swagger"

export class MapPresenter {
   @ApiProperty()
   id?: string
   @ApiProperty()
   activity_id?: any
   @ApiProperty()
   polyline?: any
   @ApiProperty()
   resource_state?: number
   @ApiProperty()
   summary_polyline?: string

   constructor(map: MapPresenter) {
      Object.assign(this, map);
   }
}

export class ActivityPresenter {
   @ApiProperty()
   id?: string
   @ApiProperty()
   athlete_id: string
   @ApiProperty()
   strava_id: number
   @ApiProperty()
   resource_state: number
   @ApiProperty()
   name: string
   @ApiProperty()
   distance: number
   @ApiProperty()
   moving_time: number
   @ApiProperty()
   elapsed_time: number
   @ApiProperty()
   total_elevation_gain: number
   @ApiProperty()
   type: string
   @ApiProperty()
   sport_type: string
   @ApiProperty()
   workout_type: any
   @ApiProperty()
   start_date: string
   @ApiProperty()
   start_date_local: string
   @ApiProperty()
   timezone: string
   @ApiProperty()
   utc_offset: number
   @ApiProperty()
   location_city: any
   @ApiProperty()
   location_state: any
   @ApiProperty()
   location_country: any
   @ApiProperty()
   achievement_count: number
   @ApiProperty()
   kudos_count: number
   @ApiProperty()
   comment_count: number
   @ApiProperty()
   athlete_count: number
   @ApiProperty()
   photo_count: number
   @ApiProperty()
   trainer: boolean
   @ApiProperty()
   commute: boolean
   @ApiProperty()
   manual: boolean
   @ApiProperty()
   private: boolean
   @ApiProperty()
   visibility: string
   @ApiProperty()
   flagged: boolean
   @ApiProperty()
   gear_id: any
   @ApiProperty()
   start_latlng: number[]
   @ApiProperty()
   end_latlng: number[]
   @ApiProperty()
   average_speed: number
   @ApiProperty()
   max_speed: number
   @ApiProperty()
   average_cadence: number
   @ApiProperty()
   average_watts?: number
   @ApiProperty()
   max_watts?: number
   @ApiProperty()
   weighted_average_watts?: number
   @ApiProperty()
   device_watts: boolean
   @ApiProperty()
   kilojoules?: number
   @ApiProperty()
   has_heartrate: boolean
   @ApiProperty()
   average_heartrate: number
   @ApiProperty()
   max_heartrate: number
   @ApiProperty()
   heartrate_opt_out: boolean
   @ApiProperty()
   display_hide_heartrate_option: boolean
   @ApiProperty()
   elev_high: number
   @ApiProperty()
   elev_low: number
   @ApiProperty()
   upload_id: number
   @ApiProperty()
   upload_id_str: string
   @ApiProperty()
   external_id: string
   @ApiProperty()
   from_accepted_tag: boolean
   @ApiProperty()
   pr_count: number
   @ApiProperty()
   total_photo_count: number
   @ApiProperty()
   has_kudoed: boolean
   @ApiProperty()
   rep: number
   @ApiProperty()
   feel: number
   @ApiProperty({ type: AthletePresenter })
   athlete: AthletePresenter
   @ApiProperty({ type: MapPresenter })
   map: MapPresenter

   constructor(activity: ActivityPresenter) {
      const { athlete, map, ...rest } = activity;
      Object.assign(this, rest);
      this.athlete = new AthletePresenter(athlete);
      this.map = new MapPresenter(map);
   }
}

