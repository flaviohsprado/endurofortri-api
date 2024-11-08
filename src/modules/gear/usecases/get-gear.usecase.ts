import { IGear } from "@/interfaces/gear.interface";
import { CacheService } from "@/services/cache/cache.service";
import { Logger } from "@nestjs/common";
import { GearRepository } from "../gear.repository";

export class GetGearUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: GearRepository,
      private readonly cache: CacheService,
   ) {
      this.logger = new Logger(GetGearUsecase.name);
   }

   public async execute(athleteId: string, id?: string): Promise<IGear[]> {
      this.logger.log(`Getting gears for athlete with id: ${athleteId}`);

      const cachedGears = await this.getGearsFromCache(athleteId, id);

      if (cachedGears) return cachedGears;

      const gears = await this.repository.find(athleteId, id);

      if (gears) {
         await this.setGearsInCache(athleteId, gears, id);
      }

      return gears;
   }

   private async getGearsFromCache(athleteId: string, id?: string): Promise<IGear[]> {
      if (id) {
         const cachedGears = await this.cache.getCachedObject(`gear:${athleteId}:${id}`);

         if (cachedGears) {
            this.logger.log(`Gears found in cache`);
            return cachedGears;
         }
      } else {
         const cachedGears = await this.cache.getCachedObject(`gears:${athleteId}`);

         if (cachedGears) {
            this.logger.log(`Gears found in cache`);
            return cachedGears;
         }
      }

      return null;
   }

   private async setGearsInCache(athleteId: string, gears: IGear[], id?: string): Promise<void> {
      if (id) {
         await this.cache.setObjectInCache(`gear:${athleteId}:${id}`, gears);
      } else {
         await this.cache.setObjectInCache(`gears:${athleteId}`, gears);
      }
   }
}