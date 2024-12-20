import { DeleteApiResponse } from '@/common/decorators/requests/deleteApiResponse.decorator';
import { GetApiResponse } from '@/common/decorators/requests/getApiResponse.decorator';
import { PostApiResponse } from '@/common/decorators/requests/postApiResponse.decorator';
import { PutApiResponse } from '@/common/decorators/requests/putApiResponse.decorator';
import { Body, Controller, Inject, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../usecase-proxy';
import { ActivitiesModule } from './activity.module';
import { ActivityPresenter } from './dto/activity.presenter';
import { LapPresenter } from './dto/lap.presenter';
import { Activity } from './entities/activity.entity';
import { CreateActivityUsecase } from './usecases/create-activity.usecase';
import { DeleteActivityUsecase } from './usecases/delete-activity.usecase';
import { GetActivityLapUsecase } from './usecases/get-activity-lap.usecase';
import { GetActivityUsecase } from './usecases/get-activity.usecase';
import { UpdateActivityUsecase } from './usecases/update-activity.usecase';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(
    @Inject(ActivitiesModule.GET_ACTIVITY_USECASES_PROXY)
    private readonly getActivityUsecase: UseCaseProxy<GetActivityUsecase>,
    @Inject(ActivitiesModule.CREATE_ACTIVITY_USECASES_PROXY)
    private readonly createActivityUsecase: UseCaseProxy<CreateActivityUsecase>,
    @Inject(ActivitiesModule.UPDATE_ACTIVITY_USECASES_PROXY)
    private readonly updateActivityUsecase: UseCaseProxy<UpdateActivityUsecase>,
    @Inject(ActivitiesModule.DELETE_ACTIVITY_USECASES_PROXY)
    private readonly deleteActivityUsecase: UseCaseProxy<DeleteActivityUsecase>,
    @Inject(ActivitiesModule.GET_ACTIVITY_LAP_USECASES_PROXY)
    private readonly getActivityLapUsecase: UseCaseProxy<GetActivityLapUsecase>,
  ) { }

  @GetApiResponse(ActivityPresenter, '/:athleteId', true)
  public async getActivities(
    @Param('athleteId') athleteId: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ): Promise<ActivityPresenter[]> {
    const activities = await this.getActivityUsecase.getInstance().execute(athleteId, startDate, endDate);

    return activities.map(activity => new ActivityPresenter(activity));
  }

  @PostApiResponse(Activity, '/:athleteId')
  public async create(
    @Param('athleteId') athleteId: string,
    @Body() activity: Partial<Activity>,
  ): Promise<Activity> {
    activity.athlete = { id: athleteId.toString() } as any;
    return await this.createActivityUsecase.getInstance().execute(activity);
  }

  @PutApiResponse(Activity, '/:id')
  public async update(
    @Param('id') id: string,
    @Body() activity: Partial<Activity>,
  ): Promise<Activity> {
    return await this.updateActivityUsecase.getInstance().execute(id, activity);
  }

  @GetApiResponse(LapPresenter, '/:id/laps', true)
  public async getLaps(
    @Param('id') id: string,
  ): Promise<LapPresenter[]> {
    const laps = await this.getActivityLapUsecase.getInstance().execute(id);
    return laps.map(lap => new LapPresenter(id, lap));
  }

  @DeleteApiResponse('/:id')
  public async delete(@Param('id') id: string): Promise<Activity> {
    return await this.deleteActivityUsecase.getInstance().execute(id);
  }
}
