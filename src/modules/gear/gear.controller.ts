import { DeleteApiResponse } from "@/common/decorators/requests/deleteApiResponse.decorator";
import { GetApiResponse } from "@/common/decorators/requests/getApiResponse.decorator";
import { PostApiResponse } from "@/common/decorators/requests/postApiResponse.decorator";
import { PutApiResponse } from "@/common/decorators/requests/putApiResponse.decorator";
import { Body, Controller, Inject, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "../usecase-proxy";
import { CreateGearDTO, UpdateGearDTO } from "./dto/gear.dto";
import { GearPresenter } from "./dto/gear.presenter";
import { GearModule } from "./gear.module";
import { CreateGearUsecase } from "./usecases/create-gear.usecase";
import { DeleteGearUsecase } from "./usecases/delete-gear.usecase";
import { GetGearUsecase } from "./usecases/get-gear.usecase";
import { UpdateGearUsecase } from "./usecases/update-gear.usecase";

@ApiTags('Gear')
@Controller('gear')
export class GearController {
   constructor(
      @Inject(GearModule.GET_GEAR_USECASES_PROXY)
      private readonly getGearUsecase: UseCaseProxy<GetGearUsecase>,
      @Inject(GearModule.CREATE_GEAR_USECASES_PROXY)
      private readonly createGearUsecase: UseCaseProxy<CreateGearUsecase>,
      @Inject(GearModule.UPDATE_GEAR_USECASES_PROXY)
      private readonly updateGearUsecase: UseCaseProxy<UpdateGearUsecase>,
      @Inject(GearModule.DELETE_GEAR_USECASES_PROXY)
      private readonly deleteGearUsecase: UseCaseProxy<DeleteGearUsecase>,
   ) { }

   @GetApiResponse(GearPresenter, '/:athleteId')
   public async getGear(
      @Param('athleteId') athleteId: string,
      @Query('id') id: string,
   ): Promise<GearPresenter[]> {
      const gears = await this.getGearUsecase.getInstance().execute(athleteId, id);
      return gears.map(gear => new GearPresenter(gear));
   }

   @PostApiResponse(GearPresenter, '/:athleteId')
   public async create(
      @Param('athleteId') athleteId: string,
      @Body() body: CreateGearDTO
   ): Promise<GearPresenter> {
      body.athlete_id = athleteId;
      const createdGear = await this.createGearUsecase.getInstance().execute(body);
      return new GearPresenter(createdGear);
   }

   @PutApiResponse(GearPresenter, '/:id')
   public async update(@Param('id') id: string, @Body() body: UpdateGearDTO): Promise<GearPresenter> {
      const updatedGear = await this.updateGearUsecase.getInstance().execute(id, body);
      return new GearPresenter(updatedGear);
   }

   @DeleteApiResponse('/:id')
   public async delete(@Param('id') id: string): Promise<GearPresenter> {
      const deletedGear = await this.deleteGearUsecase.getInstance().execute(id);
      return new GearPresenter(deletedGear);
   }
}