import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ActivityRepository } from '../../../../../src/modules/activities/activity.repository';
import { DeleteActivityUsecase } from '../../../../../src/modules/activities/usecases/delete-activity.usecase';
import { activityMock } from '../../../mock/activity.mock';

describe('DeleteActivityUsecase', () => {
  let usecase: DeleteActivityUsecase;
  let repository: ActivityRepository;
  let loggerSpy: jest.SpyInstance;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteActivityUsecase,
        {
          provide: ActivityRepository,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = moduleRef.get<DeleteActivityUsecase>(DeleteActivityUsecase);
    repository = moduleRef.get<ActivityRepository>(ActivityRepository);
    loggerSpy = jest.spyOn(Logger.prototype, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should successfully delete an activity', async () => {
      // Arrange
      const activityId = '123';
      jest.spyOn(repository, 'delete').mockResolvedValue(activityMock);

      // Act
      const result = await usecase.execute(activityId);

      // Assert
      expect(result).toBe(activityMock);
    });

    it('should handle non-existent activity', async () => {
      // Arrange
      const activityId = 'non-existent-id';
      const loggerWarnSpy = jest.spyOn(Logger.prototype, 'warn');
      jest.spyOn(repository, 'delete').mockResolvedValue(null);

      // Act
      const result = await usecase.execute(activityId);

      // Assert
      expect(result).toBeNull();
    });

    it('should throw an error if repository throws', async () => {
      // Arrange
      const activityId = '123';
      const error = new Error('Database error');
      jest.spyOn(repository, 'delete').mockRejectedValue(error);

      // Act & Assert
      await expect(usecase.execute(activityId)).rejects.toThrow(error);
    });
  });
});
