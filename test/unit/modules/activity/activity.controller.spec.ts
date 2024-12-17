import { ActivitiesController } from '@/modules/activities/activity.controller';
import { ActivitiesModule } from '@/modules/activities/activity.module';
import { Activity } from '@/modules/activities/entities/activity.entity';
import { CreateActivityUsecase } from '@/modules/activities/usecases/create-activity.usecase';
import { DeleteActivityUsecase } from '@/modules/activities/usecases/delete-activity.usecase';
import { GetActivityUsecase } from '@/modules/activities/usecases/get-activity.usecase';
import { UpdateActivityUsecase } from '@/modules/activities/usecases/update-activity.usecase';
import { UseCaseProxy } from '@/modules/usecase-proxy';
import { Test, TestingModule } from '@nestjs/testing';

describe('ActivitiesController', () => {
   let controller: ActivitiesController;
   let getActivityUseCaseProxy: UseCaseProxy<GetActivityUsecase>;
   let createActivityUseCaseProxy: UseCaseProxy<CreateActivityUsecase>;
   let updateActivityUseCaseProxy: UseCaseProxy<UpdateActivityUsecase>;
   let deleteActivityUseCaseProxy: UseCaseProxy<DeleteActivityUsecase>;

   const mockActivity: Activity = {
      id: '1',
      athlete: { id: '123' } as any,
      // Add other required properties as needed
   } as Activity;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [ActivitiesController],
         providers: [
            {
               provide: ActivitiesModule.GET_ACTIVITY_USECASES_PROXY,
               useValue: {
                  getInstance: jest.fn(() => ({
                     execute: jest.fn().mockResolvedValue([mockActivity]),
                  })),
               },
            },
            {
               provide: ActivitiesModule.CREATE_ACTIVITY_USECASES_PROXY,
               useValue: {
                  getInstance: jest.fn(() => ({
                     execute: jest.fn().mockResolvedValue(mockActivity),
                  })),
               },
            },
            {
               provide: ActivitiesModule.UPDATE_ACTIVITY_USECASES_PROXY,
               useValue: {
                  getInstance: jest.fn(() => ({
                     execute: jest.fn().mockResolvedValue(mockActivity),
                  })),
               },
            },
            {
               provide: ActivitiesModule.DELETE_ACTIVITY_USECASES_PROXY,
               useValue: {
                  getInstance: jest.fn(() => ({
                     execute: jest.fn().mockResolvedValue(mockActivity),
                  })),
               },
            },
         ],
      }).compile();

      controller = module.get<ActivitiesController>(ActivitiesController);
      getActivityUseCaseProxy = module.get(ActivitiesModule.GET_ACTIVITY_USECASES_PROXY);
      createActivityUseCaseProxy = module.get(ActivitiesModule.CREATE_ACTIVITY_USECASES_PROXY);
      updateActivityUseCaseProxy = module.get(ActivitiesModule.UPDATE_ACTIVITY_USECASES_PROXY);
      deleteActivityUseCaseProxy = module.get(ActivitiesModule.DELETE_ACTIVITY_USECASES_PROXY);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   describe('getActivities', () => {
      it('should return an array of activities', async () => {
         const athleteId = '123';
         const result = await controller.getActivities(athleteId);

         expect(result).toEqual([mockActivity]);
      });
   });

   describe('create', () => {
      it('should create a new activity', async () => {
         const athleteId = '123';
         const activityData: Partial<Activity> = {
            // Add activity data here
         };

         const result = await controller.create(athleteId, activityData);

         expect(result).toEqual(mockActivity);
      });
   });

   describe('update', () => {
      it('should update an activity', async () => {
         const activityId = '1';
         const updateData: Partial<Activity> = {
            // Add update data here
         };

         const result = await controller.update(activityId, updateData);

         expect(result).toEqual(mockActivity);
      });
   });

   describe('delete', () => {
      it('should delete an activity', async () => {
         const activityId = '1';

         const result = await controller.delete(activityId);

         expect(result).toEqual(mockActivity);
      });
   });
});
