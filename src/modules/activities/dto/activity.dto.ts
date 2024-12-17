import { IsOptionalArray } from "@/common/decorators/validators/isOptionalArray.decorator"
import { IsOptionalBoolean } from "@/common/decorators/validators/isOptionalBoolean.decorator"
import { IsOptionalNumber } from "@/common/decorators/validators/isOptionalNumber.decorator"
import { IsOptionalObject } from "@/common/decorators/validators/isOptionalObject.decorator"
import { IsOptionalString } from "@/common/decorators/validators/isOptionalString.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"
import { MapDTO } from "./map.dto"

export class ResourceStateDTO {
   @IsOptionalNumber()
   public id: number

   @IsOptionalNumber()
   public resource_state: number

   constructor(resourceState: ResourceStateDTO) {
      this.id = resourceState.id
      this.resource_state = resourceState.resource_state
   }
}

export class ActivityDTO {
   @IsOptionalNumber()
   public strava_id: number

   @IsOptionalNumber()
   public resource_state: number

   /*@IsOptionalObject({ type: ResourceStateDTO })
   public athlete: ResourceStateDTO*/

   @IsRequiredString()
   public athlete_id: string

   @IsOptionalString()
   public name: string

   @IsOptionalNumber()
   public distance: number

   @IsOptionalNumber()
   public moving_time: number

   @IsOptionalNumber()
   public elapsed_time: number

   @IsOptionalNumber()
   public total_elevation_gain: number

   @IsOptionalString()
   public type: string

   @IsOptionalString()
   public sport_type: string

   @IsOptionalString()
   public workout_type: string

   @IsOptionalString()
   public start_date: string

   @IsOptionalString()
   public start_date_local: string

   @IsOptionalString()
   public timezone: string

   @IsOptionalNumber()
   public utc_offset: number

   @IsOptionalString()
   public location_city: string

   @IsOptionalString()
   public location_state: string

   @IsOptionalString()
   public location_country: string

   @IsOptionalNumber()
   public achievement_count: number

   @IsOptionalNumber()
   public kudos_count: number

   @IsOptionalNumber()
   public comment_count: number

   @IsOptionalNumber()
   public athlete_count: number

   @IsOptionalNumber()
   public photo_count: number

   @IsOptionalObject({ type: MapDTO })
   public map: MapDTO

   @IsOptionalBoolean()
   public trainer: boolean

   @IsOptionalBoolean()
   public commute: boolean

   @IsOptionalBoolean()
   public manual: boolean

   @IsOptionalBoolean()
   public private: boolean

   @IsOptionalString()
   public visibility: string

   @IsOptionalBoolean()
   public flagged: boolean

   @IsOptionalString()
   public gear_id: string

   @IsOptionalArray({ type: Array<number> })
   public start_latlng: number[]

   @IsOptionalArray({ type: Array<number> })
   public end_latlng: number[]

   @IsOptionalNumber()
   public average_speed: number

   @IsOptionalNumber()
   public max_speed: number

   @IsOptionalNumber()
   public average_cadence: number

   @IsOptionalNumber()
   public average_watts: number

   @IsOptionalNumber()
   public max_watts: number

   @IsOptionalNumber()
   public weighted_average_watts: number

   @IsOptionalBoolean()
   public device_watts: boolean

   @IsOptionalNumber()
   public kilojoules: number

   @IsOptionalBoolean()
   public has_heartrate: boolean

   @IsOptionalNumber()
   public average_heartrate: number

   @IsOptionalNumber()
   public max_heartrate: number

   @IsOptionalBoolean()
   public heartrate_opt_out: boolean

   @IsOptionalBoolean()
   public display_hide_heartrate_option: boolean

   @IsOptionalNumber()
   public elev_high: number

   @IsOptionalNumber()
   public elev_low: number

   @IsOptionalNumber()
   public upload_id: number

   @IsOptionalString()
   public upload_id_str: string

   @IsOptionalString()
   public external_id: string

   @IsOptionalBoolean()
   public from_accepted_tag: boolean

   @IsOptionalNumber()
   public pr_count: number

   @IsOptionalNumber()
   public total_photo_count: number

   @IsOptionalBoolean()
   public has_kudoed: boolean

   @IsOptionalNumber()
   public rep: number

   @IsOptionalNumber()
   public feel: number

   constructor(props: ActivityDTO) {
      this.strava_id = props.strava_id
      this.athlete_id = props.athlete_id
      this.resource_state = props.resource_state
      //this.athlete = new ResourceStateDTO(props.athlete)
      this.name = props.name
      this.distance = props.distance
      this.moving_time = props.moving_time
      this.elapsed_time = props.elapsed_time
      this.total_elevation_gain = props.total_elevation_gain
      this.type = props.type
      this.sport_type = props.sport_type
      this.workout_type = props.workout_type
      this.start_date = props.start_date
      this.start_date_local = props.start_date_local
      this.timezone = props.timezone
      this.utc_offset = props.utc_offset
      this.location_city = props.location_city
      this.location_state = props.location_state
      this.location_country = props.location_country
      this.achievement_count = props.achievement_count
      this.kudos_count = props.kudos_count
      this.comment_count = props.comment_count
      this.athlete_count = props.athlete_count
      this.photo_count = props.photo_count
      this.map = new MapDTO(props.map)
      this.trainer = props.trainer
      this.commute = props.commute
      this.manual = props.manual
      this.private = props.private
      this.visibility = props.visibility
      this.flagged = props.flagged
      this.gear_id = props.gear_id
      this.start_latlng = props.start_latlng
      this.end_latlng = props.end_latlng
      this.average_speed = props.average_speed
      this.max_speed = props.max_speed
      this.average_cadence = props.average_cadence
      this.average_watts = props.average_watts
      this.max_watts = props.max_watts
      this.weighted_average_watts = props.weighted_average_watts
      this.device_watts = props.device_watts
      this.kilojoules = props.kilojoules
      this.has_heartrate = props.has_heartrate
      this.average_heartrate = props.average_heartrate
      this.max_heartrate = props.max_heartrate
      this.heartrate_opt_out = props.heartrate_opt_out
      this.display_hide_heartrate_option = props.display_hide_heartrate_option
      this.elev_high = props.elev_high
      this.elev_low = props.elev_low
      this.upload_id = props.upload_id
      this.upload_id_str = props.upload_id_str
      this.external_id = props.external_id
      this.from_accepted_tag = props.from_accepted_tag
      this.pr_count = props.pr_count
      this.total_photo_count = props.total_photo_count
      this.has_kudoed = props.has_kudoed
      this.rep = props.rep
      this.feel = props.feel
   }
}
