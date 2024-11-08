import { SharedEventRepository } from '@/modules/shared-event/shared-event.repository';
import { CreateSharedEventUsecase } from '@/modules/shared-event/usecases/create-shared-event.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { createSharedEventMock, sharedEventEntityMock } from '../../../mock/shared-event.mock';

describe('CreateSharedEventUsecase', () => {
   let usecase: CreateSharedEventUsecase;
   let repository: SharedEventRepository;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            CreateSharedEventUsecase,
            {
               provide: SharedEventRepository,
               useValue: {
                  create: jest.fn(),
               },
            },
         ],
      }).compile();

      usecase = module.get<CreateSharedEventUsecase>(CreateSharedEventUsecase);
      repository = module.get<SharedEventRepository>(SharedEventRepository);
   });

   it('should be defined', () => {
      expect(usecase).toBeDefined();
   });

   it('should create a shared event', async () => {
      jest.spyOn(repository, 'create').mockResolvedValue(sharedEventEntityMock);

      const createdSharedEvent = await usecase.execute(createSharedEventMock);

      expect(repository.create).toHaveBeenCalledWith(createSharedEventMock);
      expect(createdSharedEvent).toEqual(sharedEventEntityMock);
   });
});