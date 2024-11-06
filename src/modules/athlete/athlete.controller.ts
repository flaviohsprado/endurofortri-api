import { DeleteApiResponse } from "@/common/decorators/requests/deleteApiResponse.decorator";
import { GetApiResponse } from "@/common/decorators/requests/getApiResponse.decorator";
import { PostApiResponse } from "@/common/decorators/requests/postApiResponse.decorator";
import { PutApiResponse } from "@/common/decorators/requests/putApiResponse.decorator";
import { Body, Controller, Inject, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "../usecase-proxy";
import { AthleteModule } from "./athlete.module";
import { CreateAthleteDTO, UpdateAthleteDTO } from "./dto/athlete.dto";
import { AthletePresenter } from "./dto/athlete.presenter";
import { CreateAthleteUsecase } from "./usecases/create-athlete.usecase";
import { DeleteAthleteUsecase } from "./usecases/delete-athlete.usecase";
import { GetAthleteUsecase } from "./usecases/get-athlete.usecase";
import { UpdateAthleteUsecase } from "./usecases/update-athlete.usecase";

@ApiTags('Athlete')
@Controller("athlete")
export class AthleteController {
   constructor(
      @Inject(AthleteModule.GET_ATHLETE_USECASES_PROXY)
      private readonly getAthleteUsecase: UseCaseProxy<GetAthleteUsecase>,
      @Inject(AthleteModule.CREATE_ATHLETE_USECASES_PROXY)
      private readonly createAthleteUsecase: UseCaseProxy<CreateAthleteUsecase>,
      @Inject(AthleteModule.UPDATE_ATHLETE_USECASES_PROXY)
      private readonly updateAthleteUsecase: UseCaseProxy<UpdateAthleteUsecase>,
      @Inject(AthleteModule.DELETE_ATHLETE_USECASES_PROXY)
      private readonly deleteAthleteUsecase: UseCaseProxy<DeleteAthleteUsecase>,
   ) { }

   @GetApiResponse(AthletePresenter, '/:id')
   public async getAthlete(@Param('id') id: string): Promise<AthletePresenter> {
      const athlete = await this.getAthleteUsecase.getInstance().execute(id);
      return new AthletePresenter(athlete);
   }

   @PostApiResponse(AthletePresenter)
   public async create(@Body() body: CreateAthleteDTO): Promise<AthletePresenter> {
      const createdAthlete = await this.createAthleteUsecase.getInstance().execute(body);
      return new AthletePresenter(createdAthlete);
   }

   @PutApiResponse(AthletePresenter, '/:id')
   public async update(@Param('id') id: string, @Body() body: UpdateAthleteDTO): Promise<AthletePresenter> {
      const updatedAthlete = await this.updateAthleteUsecase.getInstance().execute(id, body);
      return new AthletePresenter(updatedAthlete);
   }

   @DeleteApiResponse('/:id')
   public async delete(@Param('id') id: string): Promise<AthletePresenter> {
      const deletedAthlete = await this.deleteAthleteUsecase.getInstance().execute(id);
      return new AthletePresenter(deletedAthlete);
   }
}