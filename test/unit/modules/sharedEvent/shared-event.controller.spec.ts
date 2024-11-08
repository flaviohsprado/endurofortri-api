import { SharedEventPresenter } from '@/modules/shared-event/dto/sharedEvent.presenter';
import { SharedEventController } from '@/modules/shared-event/shared-event.controller';
import { SharedEventModule } from '@/modules/shared-event/shared-event.module';
import { SharedEventRepository } from '@/modules/shared-event/shared-event.repository';
import { CreateSharedEventUsecase } from '@/modules/shared-event/usecases/create-shared-event.usecase';
import { DeleteSharedEventUsecase } from '@/modules/shared-event/usecases/delete-shared-event.usecase';
import { GetSharedEventUsecase } from '@/modules/shared-event/usecases/get-shared-event.usecase';
import { UpdateSharedEventUsecase } from '@/modules/shared-event/usecases/update-shared-event.usecase';
import { UseCaseProxy } from '@/modules/usecase-proxy';
import { CacheService } from '@/services/cache/cache.service';
import { Test, TestingModule } from '@nestjs/testing';
import { createSharedEventMock, sharedEventMock, sharedEventsMock, updateSharedEventMock } from '../../mock/shared-event.mock';

describe('SharedEventController', () => {
   let controller: SharedEventController;
   let repository: SharedEventRepository;
   let cacheService: CacheService;
   let getSharedEventUseCase: UseCaseProxy<GetSharedEventUsecase>;
   let createSharedEventUseCase: UseCaseProxy<CreateSharedEventUsecase>;
   let updateSharedEventUseCase: UseCaseProxy<UpdateSharedEventUsecase>;
   let deleteSharedEventUseCase: UseCaseProxy<DeleteSharedEventUsecase>;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [SharedEventController],
         providers: [
            {
               provide: SharedEventModule.GET_SHARED_EVENT_USECASES_PROXY,
               useValue: new UseCaseProxy(new GetSharedEventUsecase(
                  repository,
                  cacheService
               )),
            },
            {
               provide: SharedEventModule.CREATE_SHARED_EVENT_USECASES_PROXY,
               useValue: new UseCaseProxy(new CreateSharedEventUsecase(
                  repository,
               )),
            },
            {
               provide: SharedEventModule.UPDATE_SHARED_EVENT_USECASES_PROXY,
               useValue: new UseCaseProxy(new UpdateSharedEventUsecase(
                  repository,
               )),
            },
            {
               provide: SharedEventModule.DELETE_SHARED_EVENT_USECASES_PROXY,
               useValue: new UseCaseProxy(new DeleteSharedEventUsecase(
                  repository,
               )),
            },
         ],
      }).compile();

      controller = module.get<SharedEventController>(SharedEventController);
      getSharedEventUseCase = module.get(SharedEventModule.GET_SHARED_EVENT_USECASES_PROXY);
      createSharedEventUseCase = module.get(SharedEventModule.CREATE_SHARED_EVENT_USECASES_PROXY);
      updateSharedEventUseCase = module.get(SharedEventModule.UPDATE_SHARED_EVENT_USECASES_PROXY);
      deleteSharedEventUseCase = module.get(SharedEventModule.DELETE_SHARED_EVENT_USECASES_PROXY);
   });

   it('should get shared events', async () => {
      const athleteId = 'athleteId';
      const id = 'eventId';

      jest.spyOn(getSharedEventUseCase.getInstance(), 'execute').mockResolvedValue(sharedEventsMock);

      const result = await controller.getSharedEvent(athleteId, id);

      expect(getSharedEventUseCase.getInstance().execute).toHaveBeenCalledWith(athleteId, id);
      expect(result).toEqual(sharedEventsMock.map(event => new SharedEventPresenter(event)));
   });

   it('should create a shared event', async () => {
      jest.spyOn(createSharedEventUseCase.getInstance(), 'execute').mockResolvedValue(sharedEventMock);

      const result = await controller.createSharedEvent(createSharedEventMock);

      expect(createSharedEventUseCase.getInstance().execute).toHaveBeenCalledWith(createSharedEventMock);
      expect(result).toEqual(new SharedEventPresenter(sharedEventMock));
   });

   it('should update a shared event', async () => {
      const id = 'eventId';

      jest.spyOn(updateSharedEventUseCase.getInstance(), 'execute').mockResolvedValue(sharedEventMock);

      const result = await controller.updateSharedEvent(id, updateSharedEventMock);

      expect(updateSharedEventUseCase.getInstance().execute).toHaveBeenCalledWith(id, updateSharedEventMock);
      expect(result).toEqual(new SharedEventPresenter(sharedEventMock));
   });

   it('should delete a shared event', async () => {
      const id = 'eventId';

      jest.spyOn(deleteSharedEventUseCase.getInstance(), 'execute').mockResolvedValue(sharedEventMock);

      const result = await controller.deleteSharedEvent(id);

      expect(deleteSharedEventUseCase.getInstance().execute).toHaveBeenCalledWith(id);
      expect(result).toEqual(new SharedEventPresenter(sharedEventMock));
   });
});