import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSharedEventDTO, UpdateSharedEventDTO } from "./dto/sharedEvent.dto";
import { SharedEvent } from "./shared-event.entity";

@Injectable()
export class SharedEventRepository {
   constructor(
      @InjectRepository(SharedEvent)
      private readonly repository: Repository<SharedEvent>,
   ) { }

   public async find(athleteId: string, id?: string): Promise<SharedEvent[]> {
      if (id) {
         return await this.repository.find({ where: { athleteId, id } });
      }

      return await this.repository.find({ where: { athleteId } });
   }

   public async create(sharedEvent: CreateSharedEventDTO): Promise<SharedEvent> {
      const newSharedEvent = this.repository.create(sharedEvent);
      return await this.repository.save(newSharedEvent);
   }

   public async update(id: string, body: UpdateSharedEventDTO): Promise<SharedEvent> {
      const updateSharedEvent = await this.repository.create(body);
      await this.repository.update(id, updateSharedEvent);
      return await this.repository.findOne({ where: { id } });
   }

   public async delete(id: string): Promise<SharedEvent> {
      const sharedEvent = await this.repository.findOne({ where: { id } });

      if (sharedEvent) {
         this.repository.delete(id);
         return sharedEvent;
      }
   }
}