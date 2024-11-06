export interface IReminder {
   id: string
   gear_id: string
   name: string
   distance: number
   time: number
   activities: number
   days: number
   last_reset: Date
   starting_distance: number
   starting_time: number
   starting_activities: number
   snoozed_until: Date
   percent_used: number
   distance_used: number
   time_used: number
   activities_used: number
   days_used: number
}