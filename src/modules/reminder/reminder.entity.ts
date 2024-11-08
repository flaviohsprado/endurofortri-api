import { IsRequiredDateColumn } from "@/common/decorators/columns/isRequiredDateColumn.decorator"
import { IsRequiredNumberColumn } from "@/common/decorators/columns/isRequiredNumberColumn.decorator"
import { IsRequiredStringColumn } from "@/common/decorators/columns/isRequiredStringColumn.decorator"
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Gear } from "../gear/gear.entity"

@Entity()
export class Reminder {
   @PrimaryGeneratedColumn('uuid')
   public id: string
   @IsRequiredStringColumn()
   public gear_id: string
   @IsRequiredStringColumn()
   public name: string
   @IsRequiredNumberColumn()
   public distance: number
   @IsRequiredNumberColumn()
   public time: number
   @IsRequiredNumberColumn()
   public activities: number
   @IsRequiredNumberColumn()
   public days: number
   @IsRequiredDateColumn()
   public last_reset: Date
   @IsRequiredNumberColumn()
   public starting_distance: number
   @IsRequiredNumberColumn()
   public starting_time: number
   @IsRequiredNumberColumn()
   public starting_activities: number
   @IsRequiredDateColumn()
   public snoozed_until: Date
   @IsRequiredNumberColumn()
   public percent_used: number
   @IsRequiredNumberColumn()
   public distance_used: number
   @IsRequiredNumberColumn()
   public time_used: number
   @IsRequiredNumberColumn()
   public activities_used: number
   @IsRequiredNumberColumn()
   public days_used: number

   @ManyToOne(() => Gear, gear => gear.reminders)
   @JoinColumn({ name: 'gear_id' })
   public gear?: Gear
}