import { Athlete } from "@/modules/athlete/athlete.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAthleteDTO, UpdateAthleteDTO } from "./dto/athlete.dto";

@Injectable()
export class AthleteRepository {
   constructor(
      @InjectRepository(Athlete)
      private readonly repository: Repository<Athlete>,
   ) { }

   public async findByKey(key: string, value: string): Promise<Athlete> {
      return await this.repository.findOne({
         where: { [key]: value },
      });
   }

   public async findById(id: string): Promise<Athlete> {
      return await this.repository.findOne({ where: { id } });
   }

   public async create(body: CreateAthleteDTO): Promise<Athlete> {
      const newAthlete = await this.repository.create(body);
      return await this.repository.save(newAthlete);
   }

   public async update(id: string, body: UpdateAthleteDTO): Promise<Athlete> {
      const updateAthlete = await this.repository.create(body);
      await this.repository.update(id, updateAthlete);
      return await this.repository.findOne({ where: { id } });
   }

   public async delete(id: string): Promise<Athlete> {
      const athlete = await this.repository.findOne({ where: { id } });

      if (athlete) {
         this.repository.delete(id);
         return athlete;
      }
   }

   public async alreadyExists(
      key: string,
      value: string,
      id?: string,
   ): Promise<boolean> {
      if (!value) return false;

      const alreadyExists = await this.repository.findOne({
         where: { [key]: value },
      });

      if (alreadyExists && alreadyExists.id !== id) return true;

      return false;
   }
}