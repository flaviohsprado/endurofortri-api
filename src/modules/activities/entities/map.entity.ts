import { IsOptionalStringColumn } from "@/common/decorators/columns/isOptionalStringColumn.decorator";
import { IsOptionalNumberColumn } from "@/common/decorators/columns/isOptionalnumberColumn.decorator";
import { Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Activity } from "./activity.entity";

@Entity()
export class Map {
   @PrimaryColumn()
   public id: string

   @IsOptionalStringColumn()
   public activity_id?: string

   @IsOptionalStringColumn()
   public polyline?: string

   @IsOptionalNumberColumn()
   public resource_state: number

   @IsOptionalStringColumn()
   public summary_polyline: string

   @OneToOne(() => Activity, (activity) => activity.map, {
      onDelete: 'CASCADE'
   })
   public activity?: Activity
}
