import { IsRequiredNumberColumn } from "@/common/decorators/columns/isRequiredNumberColumn.decorator";
import { IsRequiredStringColumn } from "@/common/decorators/columns/isRequiredStringColumn.decorator";
import { Category, Type, Visibility } from "@/enums/sharedEvent.enum";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Athlete } from "../athlete/athlete.entity";

@Entity()
export class SharedEvent {
   @PrimaryGeneratedColumn('uuid')
   public id: string
   @IsRequiredStringColumn()
   public external_id: string
   @IsRequiredStringColumn()
   public athlete_id: string
   @IsRequiredStringColumn({ type: 'enum', enum: Category })
   public category: Category
   @IsRequiredStringColumn({ type: 'enum', enum: Type, array: true })
   public types: Type[]
   @IsRequiredStringColumn()
   public name: string
   @IsRequiredStringColumn()
   public start_date_local: string
   @IsRequiredStringColumn({ type: 'enum', enum: Visibility })
   public visibility: Visibility
   @IsRequiredNumberColumn()
   public chat_id: number
   @IsRequiredStringColumn()
   public description: string
   @IsRequiredStringColumn()
   public website: string
   @IsRequiredStringColumn()
   public closing_date_local: string
   @IsRequiredStringColumn()
   public location: string
   @IsRequiredStringColumn()
   public address: string
   @IsRequiredStringColumn()
   public country: string
   @IsRequiredStringColumn()
   public region: string
   @IsRequiredNumberColumn()
   public lat: number
   @IsRequiredNumberColumn()
   public lon: number
   @IsRequiredStringColumn()
   public route_file: string
   @IsRequiredStringColumn()
   public polyline: string
   @IsRequiredNumberColumn()
   public usage_count: number
   @IsRequiredStringColumn({ select: false })
   public athleteId: string

   @ManyToOne(() => Athlete, athlete => athlete.sharedEvents, { eager: true })
   @JoinColumn({ name: 'athleteId' })
   public athlete: Athlete
}