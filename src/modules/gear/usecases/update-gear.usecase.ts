import { IGear } from "@/interfaces/gear.interface";
import { Injectable, Logger } from "@nestjs/common";
import { UpdateGearDTO } from "../dto/gear.dto";
import { GearRepository } from "../gear.repository";

@Injectable()
export class UpdateGearUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: GearRepository,
   ) {
      this.logger = new Logger(UpdateGearUsecase.name);
   }

   public async execute(id: string, request: UpdateGearDTO): Promise<IGear> {
      this.logger.log(`Updating gear with name: ${request.name}`);

      const createdGear = await this.repository.update(id, request);

      this.logger.log(`Gear with name: ${request.name} updated`);

      return createdGear;
   }
}