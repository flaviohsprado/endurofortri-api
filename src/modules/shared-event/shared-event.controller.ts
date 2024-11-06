import { DeleteApiResponse } from "@/common/decorators/requests/deleteApiResponse.decorator";
import { GetApiResponse } from "@/common/decorators/requests/getApiResponse.decorator";
import { PostApiResponse } from "@/common/decorators/requests/postApiResponse.decorator";
import { PutApiResponse } from "@/common/decorators/requests/putApiResponse.decorator";
import { Body, Controller, Inject, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "../usecase-proxy";
import { CreateSharedEventDTO } from "./dto/sharedEvent.dto";
import { SharedEventPresenter } from "./dto/sharedEvent.presenter";
import { SharedEventModule } from "./shared-event.module";
import { CreateSharedEventUsecase } from "./usecases/create-shared-event.usecase";
import { DeleteSharedEventUsecase } from "./usecases/delete-shared-event.usecase";
import { GetSharedEventUsecase } from "./usecases/get-shared-event.usecase";
import { UpdateSharedEventUsecase } from "./usecases/update-shared-event.usecase";

@ApiTags('Shared Event')
@Controller("/shared-event")
export class SharedEventController {
   constructor(
      @Inject(SharedEventModule.GET_SHARED_EVENT_USECASES_PROXY)
      private readonly getSharedEventUseCase: UseCaseProxy<GetSharedEventUsecase>,
      @Inject(SharedEventModule.CREATE_SHARED_EVENT_USECASES_PROXY)
      private readonly createSharedEventUseCase: UseCaseProxy<CreateSharedEventUsecase>,
      @Inject(SharedEventModule.UPDATE_SHARED_EVENT_USECASES_PROXY)
      private readonly updateSharedEventUseCase: UseCaseProxy<UpdateSharedEventUsecase>,
      @Inject(SharedEventModule.DELETE_SHARED_EVENT_USECASES_PROXY)
      private readonly deleteSharedEventUseCase: UseCaseProxy<DeleteSharedEventUsecase>,
   ) { }

   @GetApiResponse(SharedEventPresenter, '/:athleteId')
   public async getSharedEvent(
      @Param('athleteId') athleteId: string,
      @Query('id') id: string,
   ): Promise<SharedEventPresenter[]> {
      const sharedEvent = await this.getSharedEventUseCase.getInstance().execute(athleteId, id);
      return sharedEvent.map((event) => new SharedEventPresenter(event));
   }

   @PostApiResponse(SharedEventPresenter)
   public async createSharedEvent(@Body() request: CreateSharedEventDTO): Promise<SharedEventPresenter> {
      const sharedEvent = await this.createSharedEventUseCase.getInstance().execute(request);
      return new SharedEventPresenter(sharedEvent);
   }

   @PutApiResponse(SharedEventPresenter, '/:id')
   public async updateSharedEvent(
      @Param('id') id: string,
      @Body() request: CreateSharedEventDTO,
   ): Promise<SharedEventPresenter> {
      const sharedEvent = await this.updateSharedEventUseCase.getInstance().execute(id, request);
      return new SharedEventPresenter(sharedEvent);
   }

   @DeleteApiResponse('/:id')
   public async deleteSharedEvent(@Param('id') id: string): Promise<SharedEventPresenter> {
      const sharedEvent = await this.deleteSharedEventUseCase.getInstance().execute(id);
      return new SharedEventPresenter(sharedEvent);
   }
}