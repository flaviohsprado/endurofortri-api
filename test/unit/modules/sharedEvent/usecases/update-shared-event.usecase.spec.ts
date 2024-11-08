import { SharedEventRepository } from "@/modules/shared-event/shared-event.repository";
import { UpdateSharedEventUsecase } from "@/modules/shared-event/usecases/update-shared-event.usecase";
import { Test, TestingModule } from "@nestjs/testing";
import { sharedEventEntityMock, updateSharedEventMock } from "../../../mock/shared-event.mock";

describe('UpdateSharedEventUsecase', () => {
   let usecase: UpdateSharedEventUsecase;
   let repository: SharedEventRepository;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            UpdateSharedEventUsecase,
            {
               provide: SharedEventRepository,
               useValue: {
                  update: jest.fn(),
               },
            },
         ],
      }).compile();

      usecase = module.get<UpdateSharedEventUsecase>(UpdateSharedEventUsecase);
      repository = module.get<SharedEventRepository>(SharedEventRepository);
   });

   it('should be defined', () => {
      expect(usecase).toBeDefined();
   });

   it('should update a shared event', async () => {
      const id = '1';

      jest.spyOn(repository, 'update').mockResolvedValue(sharedEventEntityMock);

      const updatedSharedEvent = await usecase.execute(id, updateSharedEventMock);

      expect(repository.update).toHaveBeenCalledWith(id, updateSharedEventMock);
      expect(updatedSharedEvent).toEqual(sharedEventEntityMock);
   });
});