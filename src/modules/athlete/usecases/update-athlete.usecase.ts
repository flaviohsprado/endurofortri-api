import { IAthlete } from "@/interfaces/athlete.interface";
import { BcryptService } from "@/services/bcrypt/bcrypt.service";
import { ForbiddenException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AthleteRepository } from "../athlete.repository";
import { UpdateAthleteDTO } from "../dto/athlete.dto";

@Injectable()
export class UpdateAthleteUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: AthleteRepository,
      private readonly bcryptService: BcryptService
   ) {
      this.logger = new Logger(UpdateAthleteUsecase.name);
   }

   public async execute(id: string, request: UpdateAthleteDTO): Promise<IAthlete> {
      if (await this.repository.alreadyExists('email', request.email, id))
         throw new ForbiddenException({
            message: 'Email already exists in app!',
            statusCode: HttpStatus.FORBIDDEN,
         });

      if (request.password)
         request.password = await this.bcryptService.createHash(request.password);


      this.logger.log(`Updating athlete with name: ${request.name}`);

      const updatedAthlete = await this.repository.update(id, request);

      this.logger.log(`Athlete with name: ${request.name} updated`);

      return updatedAthlete;
   }
}