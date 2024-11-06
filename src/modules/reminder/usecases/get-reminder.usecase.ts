import { CacheService } from "@/services/cache/cache.service";
import { Injectable, Logger } from "@nestjs/common";
import { Reminder } from "../reminder.entity";
import { ReminderRepository } from "../reminder.repository";

@Injectable()
export class GetReminderUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: ReminderRepository,
      private readonly cacheService: CacheService,
   ) {
      this.logger = new Logger(GetReminderUsecase.name);
   }

   public async execute(gearId: string): Promise<Reminder[]> {
      this.logger.log(`Getting reminder for gear ${gearId}`);

      const cachedReminders = await this.cacheService.getCachedObject(`reminders:${gearId}`);

      if (cachedReminders) {
         this.logger.log(`Reminder found in cache for gear ${gearId}`);
         return cachedReminders;
      }

      const reminders = this.repository.findAll(gearId);

      await this.cacheService.setObjectInCache(`reminders:${gearId}`, reminders);

      this.logger.log(`Reminder found for gear ${gearId}`);

      return reminders;
   }
}