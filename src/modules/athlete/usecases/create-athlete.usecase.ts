import { BcryptService } from "@/services/bcrypt/bcrypt.service";
import { JwtTokenService } from "@/services/jwt/jwt.service";
import { ForbiddenException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AthleteRepository } from "../athlete.repository";
import { CreateAthleteDTO } from "../dto/athlete.dto";
import { AthletePresenter } from "../dto/athlete.presenter";

@Injectable()
export class CreateAthleteUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: AthleteRepository,
      private readonly bcryptService: BcryptService,
      private readonly jwtTokenService: JwtTokenService,
   ) {
      this.logger = new Logger(CreateAthleteUsecase.name);
   }

   public async execute(request: CreateAthleteDTO): Promise<AthletePresenter> {
      this.logger.log(`Creating athlete with name: ${request.name}`);

      if (await this.repository.alreadyExists('email', request.email)) {
         throw new ForbiddenException({
            message: 'Email already exists in app!',
            statusCode: HttpStatus.FORBIDDEN,
         });
      }

      request.password = await this.bcryptService.createHash(request.password);

      const createdAthlete = await this.repository.create(request);

      const token = this.jwtTokenService.createToken({ id: createdAthlete.id, email: createdAthlete.email, name: createdAthlete.name });

      this.logger.log(`Athlete with name: ${request.name} created`);

      return new AthletePresenter({ ...createdAthlete, access_token: token });
   }
}