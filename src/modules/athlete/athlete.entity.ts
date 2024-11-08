import { IsRequiredStringColumn } from "@/common/decorators/columns/isRequiredStringColumn.decorator";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gear } from "../gear/gear.entity";
import { SharedEvent } from "../shared-event/shared-event.entity";

@Entity()
export class Athlete {
   @PrimaryGeneratedColumn('uuid')
   public id: string
   @IsRequiredStringColumn()
   public name: string
   @IsRequiredStringColumn()
   public profile_medium: string
   @IsRequiredStringColumn()
   public city: string
   @IsRequiredStringColumn()
   public state: string
   @IsRequiredStringColumn()
   public country: string
   @IsRequiredStringColumn()
   public timezone: string
   @IsRequiredStringColumn()
   public sex: string
   @IsRequiredStringColumn()
   public bio: string
   @IsRequiredStringColumn()
   public website: string
   @IsRequiredStringColumn()
   public email: string

   @OneToMany(() => SharedEvent, (sharedEvent) => sharedEvent.athlete, {
      cascade: true,
      onDelete: 'CASCADE',
      nullable: true,
   })
   public sharedEvents?: SharedEvent[];

   @OneToMany(() => Gear, (gear) => gear.athlete, {
      cascade: true,
      onDelete: 'CASCADE',
      nullable: true,
   })
   public gears?: Gear[];
}