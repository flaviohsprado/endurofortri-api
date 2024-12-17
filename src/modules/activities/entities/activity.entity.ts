import { IsOptionalBooleanColumn } from '@/common/decorators/columns/isOptionalBooleanColumn.decorator';
import { IsOptionalNumberColumn } from '@/common/decorators/columns/isOptionalnumberColumn.decorator';
import { IsOptionalStringColumn } from '@/common/decorators/columns/isOptionalStringColumn.decorator';
import { IsRequiredStringColumn } from '@/common/decorators/columns/isRequiredStringColumn.decorator';
import { Athlete } from '@/modules/athlete/athlete.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Map } from './map.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  public id?: string

  @IsRequiredStringColumn()
  public athlete_id: string

  @IsOptionalNumberColumn()
  public strava_id: number

  @IsOptionalNumberColumn()
  public resource_state: number

  @IsOptionalStringColumn()
  public name: string

  @IsOptionalNumberColumn()
  public distance: number

  @IsOptionalNumberColumn()
  public moving_time: number

  @IsOptionalNumberColumn()
  public elapsed_time: number

  @IsOptionalNumberColumn()
  public total_elevation_gain: number

  @IsOptionalStringColumn()
  public type: string

  @IsOptionalStringColumn()
  public sport_type: string

  @IsOptionalStringColumn()
  public workout_type: string

  @IsOptionalStringColumn()
  public start_date: string

  @IsOptionalStringColumn()
  public start_date_local: string

  @IsOptionalStringColumn()
  public timezone: string

  @IsOptionalNumberColumn()
  public utc_offset: number

  @IsOptionalStringColumn()
  public location_city: string

  @IsOptionalStringColumn()
  public location_state: string

  @IsOptionalStringColumn()
  public location_country: string

  @IsOptionalNumberColumn()
  public achievement_count: number

  @IsOptionalNumberColumn()
  public kudos_count: number

  @IsOptionalNumberColumn()
  public comment_count: number

  @IsOptionalNumberColumn()
  public athlete_count: number

  @IsOptionalNumberColumn()
  public photo_count: number

  @IsOptionalBooleanColumn()
  public trainer: boolean

  @IsOptionalBooleanColumn()
  public commute: boolean

  @IsOptionalBooleanColumn()
  public manual: boolean

  @IsOptionalBooleanColumn()
  public private: boolean

  @IsOptionalStringColumn()
  public visibility: string

  @IsOptionalBooleanColumn()
  public flagged: boolean

  @IsOptionalStringColumn()
  public gear_id: string

  @Column('float', { array: true, nullable: true })
  public start_latlng: number[]

  @Column('float', { array: true, nullable: true })
  public end_latlng: number[]

  @IsOptionalNumberColumn()
  public average_speed: number

  @IsOptionalNumberColumn()
  public max_speed: number

  @IsOptionalNumberColumn()
  public average_cadence: number

  @IsOptionalNumberColumn()
  public average_watts: number

  @IsOptionalNumberColumn()
  public max_watts: number

  @IsOptionalNumberColumn()
  public weighted_average_watts: number

  @IsOptionalBooleanColumn()
  public device_watts: boolean

  @IsOptionalNumberColumn()
  public kilojoules: number

  @IsOptionalBooleanColumn()
  public has_heartrate: boolean

  @IsOptionalNumberColumn()
  public average_heartrate: number

  @IsOptionalNumberColumn()
  public max_heartrate: number

  @IsOptionalBooleanColumn()
  public heartrate_opt_out: boolean

  @IsOptionalBooleanColumn()
  public display_hide_heartrate_option: boolean

  @IsOptionalNumberColumn()
  public elev_high: number

  @IsOptionalNumberColumn()
  public elev_low: number

  @IsOptionalNumberColumn()
  public upload_id: number

  @IsOptionalStringColumn()
  public upload_id_str: string

  @IsOptionalStringColumn()
  public external_id: string

  @IsOptionalBooleanColumn()
  public from_accepted_tag: boolean

  @IsOptionalNumberColumn()
  public pr_count: number

  @IsOptionalNumberColumn()
  public total_photo_count: number

  @IsOptionalBooleanColumn()
  public has_kudoed: boolean

  @IsOptionalNumberColumn()
  public rep: number

  @IsOptionalNumberColumn()
  public feel: number

  @ManyToOne(() => Athlete)
  @JoinColumn({ name: 'athlete_id' })
  public athlete: Athlete

  @OneToOne(() => Map, (map) => map.activity, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'map_id' })
  public map: Map
}
