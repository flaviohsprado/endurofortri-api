import { Injectable, Logger } from "@nestjs/common";
import { CreateGearDTO } from "../dto/gear.dto";
import { Gear } from "../gear.entity";
import { GearRepository } from "../gear.repository";

@Injectable()
export class CreateGearUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: GearRepository,
   ) {
      this.logger = new Logger(CreateGearUsecase.name);
   }

   public async execute(gear: CreateGearDTO): Promise<Gear> {
      this.logger.log(`Creating gear for gear ${gear.name}`);

      const createdGear = this.repository.create(gear);

      this.logger.log(`Gear created for gear ${gear.name}`);

      return createdGear;
   }
}