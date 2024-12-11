import { ActivityRepository } from '@/modules/activities/activity.repository';
import { GetActivityUsecase } from '@/modules/activities/usecases/get-activity.usecase';
import { CacheService } from '@/services/cache/cache.service';
import { Test, TestingModule } from '@nestjs/testing';
import { activitiesMock } from '../../../mock/activity.mock';

describe('GetActivityUsecase', () => {
   let usecase: GetActivityUsecase;
   let repository: jest.Mocked<ActivityRepository>;
   let cacheService: jest.Mocked<CacheService>;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            GetActivityUsecase,
            {
               provide: ActivityRepository,
               useValue: {
                  find: jest.fn(),
               },
            },
            {
               provide: CacheService,
               useValue: {
                  getCachedObject: jest.fn(),
                  setObjectInCache: jest.fn(),
               },
            },
         ],
      }).compile();

      usecase = module.get<GetActivityUsecase>(GetActivityUsecase);
      repository = module.get(ActivityRepository);
      cacheService = module.get(CacheService);
   });

   afterEach(() => {
      jest.clearAllMocks();
   });

   describe('execute', () => {
      const athleteId = 'athlete-1';
      const cacheKey = `activities:${athleteId}`;

      it('should return cached activities when they exist', async () => {
         // Arrange
         cacheService.getCachedObject.mockResolvedValue(activitiesMock);

         // Act
         const result = await usecase.execute(athleteId);

         // Assert
         expect(result).toEqual(activitiesMock);
      });

      it('should fetch and cache activities when cache is empty', async () => {
         // Arrange
         cacheService.getCachedObject.mockResolvedValue(null);
         repository.find.mockResolvedValue(activitiesMock);

         // Act
         const result = await usecase.execute(athleteId);

         // Assert
         expect(result).toEqual(activitiesMock);
      });

      it('should handle repository errors', async () => {
         // Arrange
         const error = new Error('Database error');
         cacheService.getCachedObject.mockResolvedValue(null);
         repository.find.mockRejectedValue(error);

         // Act & Assert
         await expect(usecase.execute(athleteId)).rejects.toThrow(error);
         expect(cacheService.getCachedObject).toHaveBeenCalledWith(cacheKey);
         expect(repository.find).toHaveBeenCalledWith(athleteId);
         expect(cacheService.setObjectInCache).not.toHaveBeenCalled();
      });
   });
});
