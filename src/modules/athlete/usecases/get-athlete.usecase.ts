import { IAthlete } from "@/interfaces/athlete.interface";
import { Logger, NotFoundException } from "@nestjs/common";
import { AthleteRepository } from "../athlete.repository";

export class GetAthleteUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: AthleteRepository,
   ) {
      this.logger = new Logger(GetAthleteUsecase.name);
   }

   public async execute(id?: string): Promise<IAthlete> {
      this.logger.log(`Getting athlete event with id: ${id}`);

      const athlete = await this.repository.findById(id);

      if (!athlete) {
         this.logger.error(`Athlete with id: ${id} not found`);
         throw new NotFoundException(`Athlete with id: ${id} not found`);
      }

      return athlete;
   }
}