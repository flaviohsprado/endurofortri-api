import { SharedEventRepository } from '@/modules/shared-event/shared-event.repository';
import { DeleteSharedEventUsecase } from '@/modules/shared-event/usecases/delete-shared-event.usecase';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { sharedEventEntityMock } from '../../../mock/shared-event.mock';

describe('DeleteSharedEventUsecase', () => {
   let usecase: DeleteSharedEventUsecase;
   let repository: SharedEventRepository;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            DeleteSharedEventUsecase,
            {
               provide: SharedEventRepository,
               useValue: {
                  delete: jest.fn(),
               },
            },
         ],
      }).compile();

      usecase = module.get<DeleteSharedEventUsecase>(DeleteSharedEventUsecase);
      repository = module.get<SharedEventRepository>(SharedEventRepository);
   });

   it('should be defined', () => {
      expect(usecase).toBeDefined();
   });

   it('should delete a shared event', async () => {
      const id = '1';

      jest.spyOn(repository, 'delete').mockResolvedValue(sharedEventEntityMock);

      const deletedSharedEvent = await usecase.execute(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
      expect(deletedSharedEvent).toEqual(sharedEventEntityMock);
   });

   it('should throw NotFoundException if shared event not found', async () => {
      const id = '1';
      jest.spyOn(repository, 'delete').mockResolvedValue(null);

      await expect(usecase.execute(id)).rejects.toThrow(NotFoundException);
   });
});