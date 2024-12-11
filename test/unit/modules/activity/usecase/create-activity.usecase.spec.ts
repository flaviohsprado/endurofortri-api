import { Activity } from '@/modules/activities/activity.entity';
import { ActivityRepository } from '@/modules/activities/activity.repository';
import { CreateActivityUsecase } from '@/modules/activities/usecases/create-activity.usecase';
import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { activityMock, createActivityMock } from '../../../mock/activity.mock';

describe('CreateActivityUsecase', () => {
  let usecase: CreateActivityUsecase;
  let repository: ActivityRepository;
  let loggerSpy: jest.SpyInstance;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateActivityUsecase,
        {
          provide: ActivityRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = moduleRef.get<CreateActivityUsecase>(CreateActivityUsecase);
    repository = moduleRef.get<ActivityRepository>(ActivityRepository);

    // Spy on Logger
    loggerSpy = jest.spyOn(Logger.prototype, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should create an activity successfully', async () => {
      jest.spyOn(repository, 'create').mockResolvedValue(activityMock);

      const result = await usecase.execute(createActivityMock);

      expect(result).toBe(activityMock);
    });

    it('should throw an error if repository creation fails', async () => {
      // Arrange
      const activityData: Partial<Activity> = {
        name: 'Test Activity',
      };

      const error = new Error('Database error');
      jest.spyOn(repository, 'create').mockRejectedValue(error);

      // Act & Assert
      await expect(usecase.execute(activityData)).rejects.toThrow(error);
    });
  });
}); 