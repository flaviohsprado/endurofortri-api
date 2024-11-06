import { IAthlete } from "@/interfaces/athlete.interface";
import { Injectable, Logger } from "@nestjs/common";
import { AthleteRepository } from "../athlete.repository";
import { CreateAthleteDTO } from "../dto/athlete.dto";

@Injectable()
export class CreateAthleteUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: AthleteRepository,
   ) {
      this.logger = new Logger(CreateAthleteUsecase.name);
   }

   public async execute(request: CreateAthleteDTO): Promise<IAthlete> {
      this.logger.log(`Creating athlete with name: ${request.name}`);

      const createdAthlete = await this.repository.create(request);

      this.logger.log(`Athlete with name: ${request.name} created`);

      return createdAthlete;
   }
}