import { IAthlete } from "@/interfaces/athlete.interface";
import { CacheService } from "@/services/cache/cache.service";
import { Logger } from "@nestjs/common";
import { AthleteRepository } from "../athlete.repository";

export class GetAthleteUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: AthleteRepository,
      private readonly cache: CacheService,
   ) {
      this.logger = new Logger(GetAthleteUsecase.name);
   }

   public async execute(id?: string): Promise<IAthlete> {
      this.logger.log(`Getting athlete event with id: ${id}`);

      const cachedAthlete = await this.cache.getCachedObject(`athlete:${id}`);

      if (cachedAthlete) {
         this.logger.log(`Athlete with id: ${id} found in cache`);
         return cachedAthlete;
      }

      const athlete = await this.repository.findById(id);

      if (!athlete) {
         this.logger.error(`Athlete with id: ${id} not found`);
         throw new Error(`Athlete with id: ${id} not found`);
      }

      await this.cache.setObjectInCache(`athlete:${id}`, athlete);

      return athlete;
   }
}