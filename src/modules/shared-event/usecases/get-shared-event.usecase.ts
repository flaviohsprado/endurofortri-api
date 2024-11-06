import { ISharedEvent } from "@/interfaces/sharedEvent.interface";
import { CacheService } from "@/services/cache/cache.service";
import { Logger } from "@nestjs/common";
import { SharedEventRepository } from "../shared-event.repository";

export class GetSharedEventUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: SharedEventRepository,
      private readonly cache: CacheService,
   ) {
      this.logger = new Logger(GetSharedEventUsecase.name);
   }

   public async execute(athleteId: string, id?: string): Promise<ISharedEvent[]> {
      this.logger.log(`Getting shared events for athlete with id: ${athleteId}`);

      const cachedSharedEvents = await this.getSharedEventsFromCache(athleteId, id);

      if (cachedSharedEvents) return cachedSharedEvents;

      const sharedEvents = await this.repository.find(athleteId, id);

      if (sharedEvents) {
         await this.setSharedEventsInCache(athleteId, sharedEvents, id);
      }

      return sharedEvents;
   }

   private async getSharedEventsFromCache(athleteId: string, id?: string): Promise<ISharedEvent[]> {
      if (id) {
         const cachedSharedEvents = await this.cache.getCachedObject(`shared-event:${athleteId}:${id}`);

         if (cachedSharedEvents) {
            this.logger.log(`Shared events found in cache`);
            return cachedSharedEvents;
         }
      } else {
         const cachedSharedEvents = await this.cache.getCachedObject(`shared-events:${athleteId}`);

         if (cachedSharedEvents) {
            this.logger.log(`Shared events found in cache`);
            return cachedSharedEvents;
         }
      }

      return null;
   }

   private async setSharedEventsInCache(athleteId: string, sharedEvents: ISharedEvent[], id?: string): Promise<void> {
      if (id) {
         await this.cache.setObjectInCache(`shared-event:${athleteId}:${id}`, sharedEvents);
      } else {
         await this.cache.setObjectInCache(`shared-events:${athleteId}`, sharedEvents);
      }
   }
}