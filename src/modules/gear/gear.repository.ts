import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGearDTO, UpdateGearDTO } from "./dto/gear.dto";
import { Gear } from "./gear.entity";

@Injectable()
export class GearRepository {
   constructor(
      @InjectRepository(Gear)
      private readonly repository: Repository<Gear>,
   ) { }

   public async find(athleteId: string, id?: string): Promise<Gear[]> {
      if (id) {
         return await this.repository.find({ where: { athlete_id: athleteId, id } });
      }

      return await this.repository.find({ where: { athlete_id: athleteId } });
   }

   public async create(gear: CreateGearDTO): Promise<Gear> {
      const newGear = this.repository.create(gear);
      return this.repository.save(newGear);
   }

   public async update(id: string, reminder: UpdateGearDTO): Promise<Gear> {
      const updateGear = this.repository.create(reminder);

      await this.repository.update(id, updateGear);

      return this.repository.findOne({ where: { id } });
   }

   public async delete(id: string): Promise<Gear> {
      const gear = await this.repository.findOne({ where: { id } });

      if (gear) {
         this.repository.delete(id);
         return gear;
      }
   }
}