import { Category, Type, Visibility } from "@/enums/sharedEvent.enum"
import { IAthlete } from "./athlete.interface"

export interface ISharedEvent {
   id: string
   external_id: string
   athlete_id: string
   category: Category
   types: Type[]
   name: string
   start_date_local: string
   visibility: Visibility
   chat_id: number
   description: string
   website: string
   closing_date_local: string
   location: string
   address: string
   country: string
   region: string
   lat: number
   lon: number
   route_file: string
   polyline: string
   usage_count: number
   athlete: IAthlete
}