import { IAthlete } from "@/interfaces/athlete.interface";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { AthleteRepository } from "../athlete.repository";

@Injectable()
export class DeleteAthleteUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: AthleteRepository,
   ) {
      this.logger = new Logger(DeleteAthleteUsecase.name);
   }

   public async execute(id: string): Promise<IAthlete> {
      this.logger.log(`Deleting athlete with id: ${id}`);

      const athleteDeleted = await this.repository.delete(id);

      if (!athleteDeleted) {
         throw new NotFoundException('User not found!');
      }

      this.logger.log(`Athlete with name: ${athleteDeleted.name} deleted`);

      return athleteDeleted;
   }
}