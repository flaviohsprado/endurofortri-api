import { IsRequiredBooleanColumn } from '@/common/decorators/columns/isRequiredBooleanColumn.decorator';
import { IsRequiredNumberColumn } from '@/common/decorators/columns/isRequiredNumberColumn.decorator';
import { IsRequiredStringColumn } from '@/common/decorators/columns/isRequiredStringColumn.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Athlete } from '../athlete/athlete.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsRequiredNumberColumn()
  public resource_state: number;

  @IsRequiredStringColumn()
  public name: string;

  @IsRequiredNumberColumn()
  public distance: number;

  @IsRequiredNumberColumn()
  public moving_time: number;

  @IsRequiredNumberColumn()
  public elapsed_time: number;

  @IsRequiredNumberColumn()
  public total_elevation_gain: number;

  @IsRequiredStringColumn()
  public type: string;

  @IsRequiredStringColumn()
  public sport_type: string;

  @Column({ nullable: true })
  public workout_type: number;

  @IsRequiredStringColumn()
  public external_id: string;

  @IsRequiredNumberColumn()
  public upload_id: number;

  @IsRequiredStringColumn()
  public start_date: string;

  @IsRequiredStringColumn()
  public start_date_local: string;

  @IsRequiredStringColumn()
  public timezone: string;

  @IsRequiredNumberColumn()
  public utc_offset: number;

  @Column('simple-array', { nullable: true })
  public start_latlng: number[];

  @Column('simple-array', { nullable: true })
  public end_latlng: number[];

  @Column({ nullable: true })
  public location_city: string;

  @Column({ nullable: true })
  public location_state: string;

  @IsRequiredStringColumn()
  public location_country: string;

  @IsRequiredNumberColumn()
  public achievement_count: number;

  @IsRequiredNumberColumn()
  public kudos_count: number;

  @IsRequiredNumberColumn()
  public comment_count: number;

  @IsRequiredNumberColumn()
  public athlete_count: number;

  @IsRequiredNumberColumn()
  public photo_count: number;

  @Column('json')
  public map: {
    id: string;
    summary_polyline: string;
    resource_state: number;
  };

  @IsRequiredBooleanColumn()
  public trainer: boolean;

  @IsRequiredBooleanColumn()
  public commute: boolean;

  @IsRequiredBooleanColumn()
  public manual: boolean;

  @IsRequiredBooleanColumn()
  public private: boolean;

  @IsRequiredBooleanColumn()
  public flagged: boolean;

  @Column({ nullable: true })
  public gear_id: string;

  @IsRequiredBooleanColumn()
  public from_accepted_tag: boolean;

  @IsRequiredNumberColumn()
  public average_speed: number;

  @IsRequiredNumberColumn()
  public max_speed: number;

  @Column({ type: 'float', nullable: true })
  public average_cadence: number;

  @Column({ type: 'float', nullable: true })
  public average_watts: number;

  @Column({ type: 'float', nullable: true })
  public weighted_average_watts: number;

  @Column({ type: 'float', nullable: true })
  public kilojoules: number;

  @IsRequiredBooleanColumn()
  public device_watts: boolean;

  @IsRequiredBooleanColumn()
  public has_heartrate: boolean;

  @Column({ type: 'float', nullable: true })
  public average_heartrate: number;

  @Column({ type: 'float', nullable: true })
  public max_heartrate: number;

  @Column({ type: 'float', nullable: true })
  public max_watts: number;

  @IsRequiredNumberColumn()
  public pr_count: number;

  @IsRequiredNumberColumn()
  public total_photo_count: number;

  @IsRequiredBooleanColumn()
  public has_kudoed: boolean;

  @Column({ nullable: true })
  public suffer_score: number;

  @ManyToOne(() => Athlete)
  @JoinColumn({ name: 'athlete_id' })
  public athlete: Athlete;
}
