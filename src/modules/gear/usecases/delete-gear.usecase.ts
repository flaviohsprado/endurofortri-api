import { IGear } from "@/interfaces/gear.interface";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { GearRepository } from "../gear.repository";

@Injectable()
export class DeleteGearUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: GearRepository,
   ) {
      this.logger = new Logger(DeleteGearUsecase.name);
   }

   public async execute(id: string): Promise<IGear> {
      this.logger.log(`Deleting gear with id: ${id}`);

      const gearDeleted = await this.repository.delete(id);

      if (!gearDeleted) {
         throw new NotFoundException('Gear not found!');
      }

      this.logger.log(`Gear with name: ${gearDeleted.name} deleted`);

      return gearDeleted;
   }
}