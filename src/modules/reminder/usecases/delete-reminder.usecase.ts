import { IReminder } from "@/interfaces/reminder.interface";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ReminderRepository } from "../reminder.repository";

@Injectable()
export class DeleteReminderUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: ReminderRepository,
   ) {
      this.logger = new Logger(DeleteReminderUsecase.name);
   }

   public async execute(id: string): Promise<IReminder> {
      this.logger.log(`Deleting reminder with id: ${id}`);

      const reminderDeleted = await this.repository.delete(id);

      if (!reminderDeleted) {
         throw new NotFoundException('Shared Event not found!');
      }

      this.logger.log(`Reminder with name: ${reminderDeleted.name} deleted`);

      return reminderDeleted;
   }
}