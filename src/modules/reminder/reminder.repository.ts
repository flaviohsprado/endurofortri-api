import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReminderDTO, UpdateReminderDTO } from "./dto/reminder.dto";
import { Reminder } from "./reminder.entity";

@Injectable()
export class ReminderRepository {
   constructor(
      @InjectRepository(Reminder)
      private readonly repository: Repository<Reminder>,
   ) { }

   public async findAll(gearId: string): Promise<Reminder[]> {
      return this.repository.find({ where: { gear_id: gearId } });
   }

   public async create(reminder: CreateReminderDTO): Promise<Reminder> {
      const newReminder = this.repository.create(reminder);
      return this.repository.save(newReminder);
   }

   public async update(id: string, reminder: UpdateReminderDTO): Promise<Reminder> {
      const updateReminder = this.repository.create(reminder);

      await this.repository.update(id, updateReminder);

      return this.repository.findOne({ where: { id } });
   }

   public async delete(id: string): Promise<Reminder> {
      const reminder = await this.repository.findOne({ where: { id } });

      if (reminder) {
         this.repository.delete(id);
         return reminder;
      }
   }
}