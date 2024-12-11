export interface IAthlete {
   id: string
   name: string
   profile_medium: string
   city: string
   state: string
   country: string
   timezone: string
   sex: string
   bio: string
   website: string
   email: string
   weight: number
   height: number
   access_token?: string
   strava_access_token?: string
}