import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGearDTO } from "./dto/gear.dto";
import { Gear } from "./gear.entity";

@Injectable()
export class GearRepository {
   constructor(
      @InjectRepository(Gear)
      private readonly repository: Repository<Gear>,
   ) { }

   public async findAll(athleteId: string): Promise<Gear[]> {
      return this.repository.find({ where: { athlete_id: athleteId } });
   }

   public async create(gear: CreateGearDTO): Promise<Gear> {
      const newGear = this.repository.create(gear);
      return this.repository.save(newGear);
   }
}