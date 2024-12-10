import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Activity } from './activities.entity';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private readonly repository: Repository<Activity>,
  ) {}

  public async find(athleteId: string): Promise<Activity[]> {
    return await this.repository.find({
      where: {
        athlete: {
          id: athleteId,
        },
      },
      relations: ['athlete'],
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
