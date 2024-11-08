import { GearRepository } from "@/modules/gear/gear.repository";
import { UpdateGearUsecase } from "@/modules/gear/usecases/update-gear.usecase";
import { Test, TestingModule } from "@nestjs/testing";
import { gearEntityMock, updateGearMock } from "../../../mock/gear.mock";

describe('UpdateGearUsecase', () => {
   let usecase: UpdateGearUsecase;
   let repository: GearRepository;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            UpdateGearUsecase,
            {
               provide: GearRepository,
               useValue: {
                  update: jest.fn(),
               },
            },
         ],
      }).compile();

      usecase = module.get<UpdateGearUsecase>(UpdateGearUsecase);
      repository = module.get<GearRepository>(GearRepository);
   });

   it('should be defined', () => {
      expect(usecase).toBeDefined();
   });

   describe('execute', () => {
      it('should update and return the updated gear', async () => {
         const id = '1';

         jest.spyOn(repository, 'update').mockResolvedValue(gearEntityMock);

         const result = await usecase.execute(id, updateGearMock);

         expect(result).toEqual(gearEntityMock);
         expect(repository.update).toHaveBeenCalledWith(id, updateGearMock);
      });
   });
});