import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityDTO } from './dto/activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private readonly repository: Repository<Activity>,
  ) { }

  public async findAllByAthleteId(athleteId: string): Promise<Activity[]> {
    return await this.repository.find({
      where: { athlete_id: athleteId },
      relations: ['athlete', 'map'],
    });
  }

  public async findById(id: string): Promise<Activity> {
    return await this.repository.findOne({
      where: { id },
      relations: ['athlete'],
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
