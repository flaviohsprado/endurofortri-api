import { IAthlete } from "@/interfaces/athlete.interface";
import { Injectable, Logger } from "@nestjs/common";
import { AthleteRepository } from "../athlete.repository";
import { UpdateAthleteDTO } from "../dto/athlete.dto";

@Injectable()
export class UpdateAthleteUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: AthleteRepository,
   ) {
      this.logger = new Logger(UpdateAthleteUsecase.name);
   }

   public async execute(id: string, request: UpdateAthleteDTO): Promise<IAthlete> {
      this.logger.log(`Updating athlete with name: ${request.name}`);

      const updatedAthlete = await this.repository.update(id, request);

      this.logger.log(`Athlete with name: ${request.name} updated`);

      return updatedAthlete;
   }
}