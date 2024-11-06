import { ISharedEvent } from "@/interfaces/sharedEvent.interface";
import { Injectable, Logger } from "@nestjs/common";
import { CreateSharedEventDTO } from "../dto/sharedEvent.dto";
import { SharedEventRepository } from "../shared-event.repository";

@Injectable()
export class CreateSharedEventUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: SharedEventRepository,
   ) {
      this.logger = new Logger(CreateSharedEventUsecase.name);
   }

   public async execute(request: CreateSharedEventDTO): Promise<ISharedEvent> {
      this.logger.log(`Creating athlete with name: ${request.name}`);

      const createdSharedEvent = await this.repository.create(request);

      this.logger.log(`SharedEvent with name: ${request.name} created`);

      return createdSharedEvent;
   }
}