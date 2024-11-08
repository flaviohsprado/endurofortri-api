import { GearRepository } from '@/modules/gear/gear.repository';
import { DeleteGearUsecase } from '@/modules/gear/usecases/delete-gear.usecase';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { gearEntityMock } from '../../../mock/gear.mock';

describe('DeleteGearUsecase', () => {
   let usecase: DeleteGearUsecase;
   let repository: GearRepository;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            DeleteGearUsecase,
            {
               provide: GearRepository,
               useValue: {
                  delete: jest.fn(),
               },
            },
         ],
      }).compile();

      usecase = module.get<DeleteGearUsecase>(DeleteGearUsecase);
      repository = module.get<GearRepository>(GearRepository);
   });

   it('should be defined', () => {
      expect(usecase).toBeDefined();
   });

   describe('execute', () => {
      it('should delete and return the deleted gear', async () => {
         jest.spyOn(repository, 'delete').mockResolvedValue(gearEntityMock);

         const result = await usecase.execute('6140abca-f98f-4b15-abc0-d46bab55e66b');

         expect(result).toEqual(gearEntityMock);
         expect(repository.delete).toHaveBeenCalledWith('6140abca-f98f-4b15-abc0-d46bab55e66b');
      });

      it('should throw NotFoundException if gear not found', async () => {
         const id = '1';
         jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

         try {
            await usecase.execute(id);
         } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
         }
      });
   });
});