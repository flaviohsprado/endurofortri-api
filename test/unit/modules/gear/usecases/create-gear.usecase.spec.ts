import { GearRepository } from '@/modules/gear/gear.repository';
import { CreateGearUsecase } from '@/modules/gear/usecases/create-gear.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { createGearMock, gearEntityMock } from '../../../mock/gear.mock';

describe('CreateGearUsecase', () => {
   let usecase: CreateGearUsecase;
   let repository: GearRepository;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            CreateGearUsecase,
            {
               provide: GearRepository,
               useValue: {
                  create: jest.fn(),
               },
            },
         ],
      }).compile();

      usecase = module.get<CreateGearUsecase>(CreateGearUsecase);
      repository = module.get<GearRepository>(GearRepository);
   });

   it('should be defined', () => {
      expect(usecase).toBeDefined();
   });

   describe('execute', () => {
      it('should create and return a new gear', async () => {
         jest.spyOn(repository, 'create').mockResolvedValue(gearEntityMock);

         const result = await usecase.execute(createGearMock);

         expect(result).toEqual(gearEntityMock);
         expect(repository.create).toHaveBeenCalledWith(createGearMock);
      });
   });
});