import { IStravaActivity } from '@/interfaces/strava.inferface';
import { Athlete } from '@/modules/athlete/athlete.entity';
import { AthleteRepository } from '@/modules/athlete/athlete.repository';
import { CacheService } from '@/services/cache/cache.service';
import { StravaService } from '@/services/strava/strava.service';
import { Injectable, Logger } from '@nestjs/common';
import { ActivityRepository } from '../activity.repository';
import { ActivityDTO } from '../dto/activity.dto';
import { Activity } from '../entities/activity.entity';

@Injectable()
export class GetActivityUsecase {
  private logger: Logger;

  constructor(
    private readonly repository: ActivityRepository,
    private readonly athleteRepository: AthleteRepository,
    private readonly stravaService: StravaService,
    private readonly cacheService: CacheService,
  ) {
    this.logger = new Logger(GetActivityUsecase.name);
  }

  public async execute(athleteId: string, start: Date, end: Date): Promise<Activity[]> {
    this.logger.log(`Getting activities for athlete ${athleteId}`);

    const startDate = new Date(start);
    const endDate = new Date(end);

    const cacheKey = `activities:${athleteId}`;
    const cachedActivities = await this.cacheService.getCachedObject<Activity[]>(cacheKey);

    if (cachedActivities) {
      this.logger.log(`Returning cached activities for athlete ${athleteId}`);
      return cachedActivities;
    }

    const athlete = await this.athleteRepository.findById(athleteId);
    const stravaActivities = await this.stravaService.getActivities(
      athlete.id,
      athlete.strava_access_token,
      startDate,
      endDate
    );

    await this.saveAndMergeActivities(athlete, stravaActivities, startDate);

    const activities = await this.repository.findAllByAthleteId(athleteId, startDate);

    await this.cacheService.setObjectInCache(cacheKey, activities);

    return activities;
  }

  private async saveAndMergeActivities(athlete: Athlete, activities: IStravaActivity[], startDate: Date): Promise<void> {
    // Get all existing activities from database to compare
    const existingActivities = await this.repository.findAllByAthleteId(athlete.id, startDate);
    const existingStravaIds = new Set(existingActivities.map(activity => activity.strava_id));

    // Filter out activities that already exist in the database
    const newActivities = activities.filter(
      activity => !existingStravaIds.has(activity.id)
    );

    if (newActivities.length === 0) {
      this.logger.log('No new activities to save');
      return;
    }

    // Transform Strava activities to our Activity entity format
    const activitiesToSave = newActivities.map(activity => {
      const { id, ...stravaActivityWithoutId } = activity;
      return new ActivityDTO({
        ...stravaActivityWithoutId,
        strava_id: id,
        athlete_id: athlete.id,
        rep: 0,
        feel: 0,
      });
    });

    // Save new activities to database
    await this.repository.createMany(activitiesToSave);
    this.logger.log(`Saved ${activitiesToSave.length} new activities`);
  }
}
