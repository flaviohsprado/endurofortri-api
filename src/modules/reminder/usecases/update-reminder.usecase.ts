import { IReminder } from "@/interfaces/reminder.interface";
import { Injectable, Logger } from "@nestjs/common";
import { UpdateReminderDTO } from "../dto/reminder.dto";
import { ReminderRepository } from "../reminder.repository";

@Injectable()
export class UpdateReminderUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: ReminderRepository,
   ) {
      this.logger = new Logger(UpdateReminderUsecase.name);
   }

   public async execute(id: string, request: UpdateReminderDTO): Promise<IReminder> {
      this.logger.log(`Updating athlete with name: ${request.name}`);

      const updatedReminder = await this.repository.update(id, request);

      this.logger.log(`Reminder with name: ${request.name} updated`);

      return updatedReminder;
   }
}