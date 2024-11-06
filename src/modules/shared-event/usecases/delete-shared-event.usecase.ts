import { ISharedEvent } from "@/interfaces/sharedEvent.interface";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { SharedEventRepository } from "../shared-event.repository";

@Injectable()
export class DeleteSharedEventUsecase {
   private logger: Logger;

   constructor(
      private readonly repository: SharedEventRepository,
   ) {
      this.logger = new Logger(DeleteSharedEventUsecase.name);
   }

   public async execute(id: string): Promise<ISharedEvent> {
      this.logger.log(`Deleting sharedEvent with id: ${id}`);

      const sharedEventDeleted = await this.repository.delete(id);

      if (!sharedEventDeleted) {
         throw new NotFoundException('Shared Event not found!');
      }

      this.logger.log(`SharedEvent with name: ${sharedEventDeleted.name} deleted`);

      return sharedEventDeleted;
   }
}