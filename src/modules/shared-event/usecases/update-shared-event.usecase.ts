import { ISharedEvent } from "@/interfaces/sharedEvent.interface";
import { Injectable, Logger } from "@nestjs/common";
import { UpdateSharedEventDTO } from "../dto/sharedEvent.dto";
import { SharedEventRepository } from "../shared-event.repository";

@Injectable()
export class UpdateSharedEventUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: SharedEventRepository,
   ) {
      this.logger = new Logger(UpdateSharedEventUsecase.name);
   }

   public async execute(id: string, request: UpdateSharedEventDTO): Promise<ISharedEvent> {
      this.logger.log(`Updating athlete with name: ${request.name}`);

      const updatedSharedEvent = await this.repository.update(id, request);

      this.logger.log(`SharedEvent with name: ${request.name} updated`);

      return updatedSharedEvent;
   }
}