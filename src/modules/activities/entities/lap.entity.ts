import { IsOptionalBooleanColumn } from "@/common/decorators/columns/isOptionalBooleanColumn.decorator";
import { IsOptionalNumberColumn } from "@/common/decorators/columns/isOptionalnumberColumn.decorator";
import { IsOptionalStringColumn } from "@/common/decorators/columns/isOptionalStringColumn.decorator";
import { IsRequiredNumberColumn } from "@/common/decorators/columns/isRequiredNumberColumn.decorator";
import { IsRequiredStringColumn } from "@/common/decorators/columns/isRequiredStringColumn.decorator";
import { Exclude } from "class-transformer";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Activity } from "./activity.entity";

@Entity()
export class Lap {
   @PrimaryGeneratedColumn('uuid')
   public id: string;

   @IsRequiredNumberColumn()
   public strava_id: number

   @IsRequiredStringColumn()
   public activity_id: string

   @IsOptionalNumberColumn()
   public resource_state: number

   @IsOptionalStringColumn()
   public name: string

   @IsOptionalNumberColumn()
   public elapsed_time: number

   @IsOptionalNumberColumn()
   public moving_time: number

   @IsOptionalStringColumn()
   public start_date: string

   @IsOptionalStringColumn()
   public start_date_local: string

   @IsOptionalNumberColumn()
   public distance: number

   @IsOptionalNumberColumn()
   public start_index: number

   @IsOptionalNumberColumn()
   public end_index: number

   @IsOptionalNumberColumn()
   public total_elevation_gain: number

   @IsOptionalNumberColumn()
   public average_speed: number

   @IsOptionalNumberColumn()
   public max_speed: number

   @IsOptionalNumberColumn()
   public average_cadence: number

   @IsOptionalBooleanColumn()
   public device_watts: boolean

   @IsOptionalNumberColumn()
   public average_watts: number

   @IsOptionalNumberColumn()
   public lap_index: number

   @IsOptionalNumberColumn()
   public split: number

   @ManyToOne(() => Activity)
   @JoinColumn({ name: 'activity_id' })
   @Exclude()
   public activity: Activity
}
