import { Injectable, Logger } from "@nestjs/common";
import { CreateReminderDTO } from "../dto/reminder.dto";
import { Reminder } from "../reminder.entity";
import { ReminderRepository } from "../reminder.repository";

@Injectable()
export class CreateReminderUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: ReminderRepository,
   ) {
      this.logger = new Logger(CreateReminderUsecase.name);
   }

   public async execute(reminder: CreateReminderDTO): Promise<Reminder> {
      this.logger.log(`Creating reminder for gear ${reminder.gear_id}`);

      const createdReminder = this.repository.create(reminder);

      this.logger.log(`Reminder created for gear ${reminder.gear_id}`);

      return createdReminder;
   }
}