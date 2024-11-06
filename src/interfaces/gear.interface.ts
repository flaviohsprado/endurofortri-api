import { FieldId, GearType } from "@/enums/gear.enum"
import { IReminder } from "./reminder.interface"

export interface IGear {
   id: string
   athlete_id: string
   type: GearType
   name: string
   purchased: string
   notes: string
   distance: number
   time: number
   activities: number
   use_elapsed_time: boolean
   retired: string
   component_ids: string[]
   reminders: IReminder[]
   activity_filters: IActivityFilter[]
   component: boolean
}

interface IActivityFilter {
   id: string
   field_id: FieldId
   code: string
   operator: string
   value: object
   not: boolean
}