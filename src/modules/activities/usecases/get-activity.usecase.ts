import { CacheService } from '@/services/cache/cache.service';
import { Injectable, Logger } from '@nestjs/common';
import { Activity } from '../activity.entity';
import { ActivityRepository } from '../activity.repository';

@Injectable()
export class GetActivityUsecase {
  private logger: Logger;

  constructor(
    private readonly repository: ActivityRepository,
    private readonly cacheService: CacheService,
  ) {
    this.logger = new Logger(GetActivityUsecase.name);
  }

  public async execute(athleteId: string): Promise<Activity[]> {
    this.logger.log(`Getting activities for athlete ${athleteId}`);

    const cacheKey = `activities:${athleteId}`;
    const cachedActivities = await this.cacheService.getCachedObject(cacheKey);

    if (cachedActivities) {
      this.logger.log(`Returning cached activities for athlete ${athleteId}`);
      return cachedActivities;
    }

    const activities = await this.repository.find(athleteId);
    await this.cacheService.setObjectInCache(cacheKey, activities);

    return activities;
  }
}
