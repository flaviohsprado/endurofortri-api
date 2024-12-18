import { IStravaLap } from "@/interfaces/strava.inferface";
import { CacheService } from "@/services/cache/cache.service";
import { StravaService } from "@/services/strava/strava.service";
import { Injectable, Logger } from "@nestjs/common";
import { ActivityRepository } from "../activity.repository";
import { LapDTO } from "../dto/lap.dto";
import { Activity } from "../entities/activity.entity";
import { Lap } from "../entities/lap.entity";

@Injectable()
export class GetActivityLapUsecase {
   private readonly logger: Logger;

   constructor(
      private readonly repository: ActivityRepository,
      private readonly cacheService: CacheService,
      private readonly stravaService: StravaService
   ) {
      this.logger = new Logger(GetActivityLapUsecase.name);
   }

   public async execute(id: string): Promise<Lap[]> {
      this.logger.log(`Getting laps for activity ${id}`);

      const cacheKey = `laps:${id}`;
      const cachedLaps = await this.cacheService.getCachedObject<Lap[]>(cacheKey);

      if (cachedLaps) {
         this.logger.log(`Returning cached laps for activity ${id}`);
         return cachedLaps;
      }

      const activity = await this.repository.findById(id);
      const stravaLaps = await this.stravaService.getActivityLaps(
         activity.strava_id,
         activity.athlete_id,
         activity.athlete.strava_access_token
      );

      await this.saveAndMergeLaps(activity, stravaLaps);

      const laps = await this.repository.findLapsByActivityId(id);

      await this.cacheService.setObjectInCache(cacheKey, laps);

      return laps;
   }

   private async saveAndMergeLaps(activity: Activity, laps: IStravaLap[]): Promise<void> {
      const existingLaps = await this.repository.findLapsByActivityId(activity.id);
      const existingLapIds = new Set(existingLaps.map(lap => lap.strava_id));

      const newLaps = laps.filter(lap => !existingLapIds.has(lap.id));

      if (newLaps.length === 0) {
         this.logger.log('No new laps to save');
         return;
      }

      // Transform Strava activities to our Activity entity format
      const lapsToSave = newLaps.map(lap => {
         const { id, ...lapWithoutId } = lap;

         return new LapDTO({
            strava_id: id,
            activity_id: activity.id,
            strava_activity_id: lap.activity.id,
            ...lapWithoutId
         });
      });

      await this.repository.createManyLaps(lapsToSave);
      this.logger.log(`Saved ${lapsToSave.length} new laps`);
   }
}
