export interface IStravaActivity {
  resource_state: number
  athlete: Athlete
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: string
  sport_type: string
  workout_type: any
  id: number
  start_date: string
  start_date_local: string
  timezone: string
  utc_offset: number
  location_city: any
  location_state: any
  location_country: any
  achievement_count: number
  kudos_count: number
  comment_count: number
  athlete_count: number
  photo_count: number
  map: Map
  trainer: boolean
  commute: boolean
  manual: boolean
  private: boolean
  visibility: string
  flagged: boolean
  gear_id: any
  start_latlng: number[]
  end_latlng: number[]
  average_speed: number
  max_speed: number
  average_cadence: number
  average_watts: number
  max_watts: number
  weighted_average_watts: number
  device_watts: boolean
  kilojoules: number
  has_heartrate: boolean
  average_heartrate: number
  max_heartrate: number
  heartrate_opt_out: boolean
  display_hide_heartrate_option: boolean
  elev_high: number
  elev_low: number
  upload_id: number
  upload_id_str: string
  external_id: string
  from_accepted_tag: boolean
  pr_count: number
  total_photo_count: number
  has_kudoed: boolean
}

export interface Athlete {
  id: number
  resource_state: number
}

export interface Map {
  id: string
  summary_polyline: string
  resource_state: number
  polyline?: string
}

export interface IStravaToken {
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
  access_token: string
  athlete: Athlete
}

export interface IStravaRefreshToken {
  token_type: string
  access_token: string
  expires_at: number
  expires_in: number
  refresh_token: string
}

export interface Athlete {
  id: number
  username: any
  resource_state: number
  firstname: string
  lastname: string
  bio: string
  city: string
  state: string
  country: any
  sex: string
  premium: boolean
  summit: boolean
  created_at: string
  updated_at: string
  badge_type_id: number
  weight: number
  profile_medium: string
  profile: string
  friend: any
  follower: any
}
