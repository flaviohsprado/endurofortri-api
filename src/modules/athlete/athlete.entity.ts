import { IsOptionalNumberColumn } from "@/common/decorators/columns/isOptionalnumberColumn.decorator";
import { IsOptionalStringColumn } from "@/common/decorators/columns/isOptionalStringColumn.decorator";
import { IsRequiredStringColumn } from "@/common/decorators/columns/isRequiredStringColumn.decorator";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Athlete {
   @PrimaryGeneratedColumn('uuid')
   public id: string
   @IsRequiredStringColumn()
   public name: string
   @IsRequiredStringColumn()
   public email: string
   @IsRequiredStringColumn()
   public password: string
   @IsOptionalStringColumn()
   public profile_medium: string
   @IsOptionalStringColumn()
   public city: string
   @IsOptionalStringColumn()
   public state: string
   @IsOptionalStringColumn()
   public country: string
   @IsOptionalStringColumn()
   public timezone: string
   @IsOptionalStringColumn()
   public sex: string
   @IsOptionalNumberColumn()
   public weight: number
   @IsOptionalNumberColumn()
   public height: number
   @IsOptionalStringColumn()
   public bio: string
   @IsOptionalStringColumn()
   public website: string
   @IsOptionalStringColumn()
   public strava_access_token: string
}

