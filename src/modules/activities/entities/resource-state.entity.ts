import { IsOptionalNumberColumn } from "@/common/decorators/columns/isOptionalnumberColumn.decorator";
import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ResourceState {
   @PrimaryColumn()
   public id: number

   @IsOptionalNumberColumn()
   public resource_state: number
}