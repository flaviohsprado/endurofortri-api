import { IsRequiredBooleanColumn } from "@/common/decorators/columns/isRequiredBooleanColumn.decorator";
import { IsRequiredColumn } from "@/common/decorators/columns/isRequiredColumn.decorator";
import { IsRequiredNumberColumn } from "@/common/decorators/columns/isRequiredNumberColumn.decorator";
import { IsRequiredStringColumn } from "@/common/decorators/columns/isRequiredStringColumn.decorator";
import { GearType } from "@/enums/gear.enum";
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reminder } from "../reminder/reminder.entity";

@Entity()
export class Gear {
   @PrimaryGeneratedColumn('uuid')
   public id: string
   @IsRequiredStringColumn()
   public athlete_id: string
   @IsRequiredColumn({ enum: GearType })
   public type: GearType
   @IsRequiredStringColumn()
   public name: string
   @IsRequiredStringColumn()
   public purchased: string
   @IsRequiredStringColumn()
   public notes: string
   @IsRequiredNumberColumn()
   public distance: number
   @IsRequiredNumberColumn()
   public time: number
   @IsRequiredNumberColumn()
   public activities: number
   @IsRequiredBooleanColumn()
   public use_elapsed_time: boolean
   @IsRequiredStringColumn()
   public retired: string
   @IsRequiredStringColumn({ array: true })
   public component_ids: string[]
   @IsRequiredBooleanColumn()
   public component: boolean

   @OneToMany(() => Reminder, reminder => reminder.gear, {
      nullable: true,
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
   })
   public reminders: Reminder[]

   @OneToMany(() => ActivityFilter, activityFilter => activityFilter.gear, {
      nullable: true,
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
   })
   public activity_filters: ActivityFilter[]
}

@Entity()
class ActivityFilter {
   @PrimaryGeneratedColumn('uuid')
   public id: string
   @IsRequiredStringColumn()
   public gear_id: string
   @IsRequiredStringColumn()
   public field_id: string
   @IsRequiredStringColumn()
   public code: string
   @IsRequiredStringColumn()
   public operator: string
   @IsRequiredColumn()
   public value: object
   @IsRequiredBooleanColumn()
   public not: boolean

   @ManyToOne(() => Gear, gear => gear.activity_filters, { eager: true })
   @JoinColumn({ name: 'gear_id' })
   public gear: Gear
}
