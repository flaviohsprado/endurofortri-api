import { DeleteApiResponse } from "@/common/decorators/requests/deleteApiResponse.decorator";
import { GetApiResponse } from "@/common/decorators/requests/getApiResponse.decorator";
import { PostApiResponse } from "@/common/decorators/requests/postApiResponse.decorator";
import { PutApiResponse } from "@/common/decorators/requests/putApiResponse.decorator";
import { Body, Controller, Inject, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "../usecase-proxy";
import { CreateReminderDTO } from "./dto/reminder.dto";
import { ReminderPresenter } from "./dto/reminder.presenter";
import { ReminderModule } from "./reminder.module";
import { CreateReminderUsecase } from "./usecases/create-reminder.usecase";
import { DeleteReminderUsecase } from "./usecases/delete-reminder.usecase";
import { GetReminderUsecase } from "./usecases/get-reminder.usecase";
import { UpdateReminderUsecase } from "./usecases/update-reminder.usecase";

@ApiTags('Reminder')
@Controller("/reminder")
export class ReminderController {
   constructor(
      @Inject(ReminderModule.GET_REMINDER_USECASES_PROXY)
      private readonly getReminderUseCase: UseCaseProxy<GetReminderUsecase>,
      @Inject(ReminderModule.CREATE_REMINDER_USECASES_PROXY)
      private readonly createReminderUseCase: UseCaseProxy<CreateReminderUsecase>,
      @Inject(ReminderModule.UPDATE_REMINDER_USECASES_PROXY)
      private readonly updateReminderUseCase: UseCaseProxy<UpdateReminderUsecase>,
      @Inject(ReminderModule.DELETE_REMINDER_USECASES_PROXY)
      private readonly deleteReminderUseCase: UseCaseProxy<DeleteReminderUsecase>,
   ) { }

   @GetApiResponse(ReminderPresenter, '/:gearId')
   public async getReminder(
      @Param('gearId') gearId: string,
   ): Promise<ReminderPresenter[]> {
      const reminder = await this.getReminderUseCase.getInstance().execute(gearId);
      return reminder.map((reminder) => new ReminderPresenter(reminder));
   }

   @PostApiResponse(ReminderPresenter)
   public async createReminder(@Body() request: CreateReminderDTO): Promise<ReminderPresenter> {
      const reminder = await this.createReminderUseCase.getInstance().execute(request);
      return new ReminderPresenter(reminder);
   }

   @PutApiResponse(ReminderPresenter, '/:id')
   public async updateReminder(
      @Param('id') id: string,
      @Body() request: CreateReminderDTO,
   ): Promise<ReminderPresenter> {
      const reminder = await this.updateReminderUseCase.getInstance().execute(id, request);
      return new ReminderPresenter(reminder);
   }

   @DeleteApiResponse('/:id')
   public async deleteReminder(@Param('id') id: string): Promise<ReminderPresenter> {
      const reminder = await this.deleteReminderUseCase.getInstance().execute(id);
      return new ReminderPresenter(reminder);
   }
}