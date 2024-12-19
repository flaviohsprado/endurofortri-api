import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { ActivityDTO } from './dto/activity.dto';
import { LapDTO } from './dto/lap.dto';
import { Activity } from './entities/activity.entity';
import { Lap } from './entities/lap.entity';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private readonly repository: Repository<Activity>,
    @InjectRepository(Lap)
    private readonly lapRepository: Repository<Lap>,
  ) { }

  public async findAllByAthleteId(athleteId: string, startDate: Date): Promise<Activity[]> {
    return await this.repository.find({
      where: {
        athlete_id: athleteId,
        start_date: MoreThan(startDate.toISOString()),
      },
      relations: ['athlete', 'map'],
    });
  }

  public async findById(id: string): Promise<Activity> {
    return await this.repository.findOne({
      where: { id },
      relations: ['athlete'],
    });
  }

  public async findLapsByActivityId(id: string): Promise<Lap[]> {
    return await this.lapRepository.find({
      where: { activity_id: id },
    });
  }

  public async create(activity: Partial<Activity>): Promise<Activity> {
    const newActivity = this.repository.create(activity);
    return this.repository.save(newActivity);
  }

  public async createMany(activities: ActivityDTO[]): Promise<void> {
    const newActivities = this.repository.create(activities);
    await this.repository.save(newActivities);
  }

  public async createManyLaps(laps: LapDTO[]): Promise<void> {
    const newLaps = this.lapRepository.create(laps);
    await this.lapRepository.save(newLaps);
  }

  public async findByStravaId(stravaId: number): Promise<Activity> {
    return await this.repository.findOne({
      where: { strava_id: stravaId },
    });
  }

  public async update(
    id: string,
    activity: Partial<Activity>,
  ): Promise<Activity> {
    await this.repository.update(id, activity);
    return this.findById(id);
  }

  public async delete(id: string): Promise<Activity> {
    const activity = await this.findById(id);
    if (activity) {
      await this.repository.delete(id);
      return activity;
    }
  }
}
