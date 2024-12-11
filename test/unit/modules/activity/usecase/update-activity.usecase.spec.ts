import { ActivityRepository } from '@/modules/activities/activity.repository';
import { UpdateActivityUsecase } from '@/modules/activities/usecases/update-activity.usecase';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { activityMock } from '../../../mock/activity.mock';

describe('UpdateActivityUseCase', () => {
   let updateActivityUseCase: UpdateActivityUsecase;
   let activityRepository: ActivityRepository;

   const mockActivityRepository = {
      findById: jest.fn(),
      update: jest.fn(),
   };

   beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
         providers: [
            UpdateActivityUsecase,
            {
               provide: ActivityRepository,
               useValue: mockActivityRepository,
            },
         ],
      }).compile();

      updateActivityUseCase = moduleRef.get<UpdateActivityUsecase>(UpdateActivityUsecase);
      activityRepository = moduleRef.get<ActivityRepository>(ActivityRepository);
   });

   afterEach(() => {
      jest.clearAllMocks();
   });

   describe('execute', () => {
      it('should successfully update an activity', async () => {
         const updateData = {
            name: 'Updated Title',
            type: 'Run',
         };

         mockActivityRepository.findById.mockResolvedValue(activityMock);
         mockActivityRepository.update.mockResolvedValue({
            ...activityMock,
            ...updateData,
         });

         const result = await updateActivityUseCase.execute('1', activityMock);

         expect(result).toEqual({
            ...activityMock,
            ...updateData,
         });
      });

      it('should throw NotFoundException when activity does not exist', async () => {
         jest.spyOn(activityRepository, 'findById').mockResolvedValue(null);

         try {
            await updateActivityUseCase.execute('1', {
               name: 'Updated Title',
            });
         } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
         }
      });

      it('should update only provided fields', async () => {
         const updateData = {
            name: 'Updated Title',
            achievement_count: 10,
         };

         mockActivityRepository.findById.mockResolvedValue(activityMock);
         mockActivityRepository.update.mockResolvedValue({
            ...updateData,
         });

         const result = await updateActivityUseCase.execute('1', activityMock);

         expect(result.name).toBe('Updated Title');
         expect(result.achievement_count).toBe(10);
      });
   });
});
