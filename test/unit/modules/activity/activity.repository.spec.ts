import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityRepository } from '../../../../src/modules/activities/activity.repository';
import { Activity } from '../../../../src/modules/activities/entities/activity.entity';

describe('ActivityRepository', () => {
   let activityRepository: ActivityRepository;
   let repository: Repository<Activity>;

   const mockActivity = {
      id: '1',
      athlete: { id: 'athlete1' },
   } as Activity;

   const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
   };

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            ActivityRepository,
            {
               provide: getRepositoryToken(Activity),
               useValue: mockRepository,
            },
         ],
      }).compile();

      activityRepository = module.get<ActivityRepository>(ActivityRepository);
      repository = module.get<Repository<Activity>>(getRepositoryToken(Activity));
   });

   afterEach(() => {
      jest.clearAllMocks();
   });

   describe('find', () => {
      it('should return activities for an athlete', async () => {
         const athleteId = 'athlete1';
         const expectedActivities = [mockActivity];
         mockRepository.find.mockResolvedValue(expectedActivities);

         const result = await activityRepository.find(athleteId);

         expect(result).toEqual(expectedActivities);
      });
   });

   describe('findById', () => {
      it('should return an activity by id', async () => {
         const activityId = '1';
         mockRepository.findOne.mockResolvedValue(mockActivity);

         const result = await activityRepository.findById(activityId);

         expect(result).toEqual(mockActivity);
      });
   });

   describe('create', () => {
      it('should create and return a new activity', async () => {
         const newActivity = { ...mockActivity };
         mockRepository.create.mockReturnValue(newActivity);
         mockRepository.save.mockResolvedValue(newActivity);

         const result = await activityRepository.create(newActivity);

         expect(result).toEqual(newActivity);
      });
   });

   describe('update', () => {
      it('should update and return the activity', async () => {
         const activityId = '1';
         const updateData = { name: 'Updated Activity' };
         mockRepository.update.mockResolvedValue({ affected: 1 });
         mockRepository.findOne.mockResolvedValue({ ...mockActivity, ...updateData });

         const result = await activityRepository.update(activityId, updateData);

         expect(result).toEqual({ ...mockActivity, ...updateData });
      });
   });

   describe('delete', () => {
      it('should delete and return the deleted activity', async () => {
         const activityId = '1';
         mockRepository.findOne.mockResolvedValue(mockActivity);
         mockRepository.delete.mockResolvedValue({ affected: 1 });

         const result = await activityRepository.delete(activityId);

         expect(result).toEqual(mockActivity);
      });

      it('should return undefined if activity not found', async () => {
         const activityId = 'nonexistent';
         mockRepository.findOne.mockResolvedValue(null);

         const result = await activityRepository.delete(activityId);

         expect(result).toBeUndefined();
      });
   });
});
