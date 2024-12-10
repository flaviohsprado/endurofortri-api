import { IsRequiredStringColumn } from "@/common/decorators/columns/isRequiredStringColumn.decorator";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

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
}