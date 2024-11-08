import { GearController } from '@/modules/gear/gear.controller';
import { GearModule } from '@/modules/gear/gear.module';
import { GearRepository } from '@/modules/gear/gear.repository';
import { CreateGearUsecase } from '@/modules/gear/usecases/create-gear.usecase';
import { DeleteGearUsecase } from '@/modules/gear/usecases/delete-gear.usecase';
import { GetGearUsecase } from '@/modules/gear/usecases/get-gear.usecase';
import { UpdateGearUsecase } from '@/modules/gear/usecases/update-gear.usecase';
import { UseCaseProxy } from '@/modules/usecase-proxy';
import { CacheService } from '@/services/cache/cache.service';
import { Test, TestingModule } from '@nestjs/testing';
import { createGearMock, gearEntityMock, gearMock, gearsMock, updateGearMock } from '../../mock/gear.mock';

describe('GearController', () => {
   let controller: GearController;
   let gearRepository: GearRepository;
   let cacheService: CacheService;
   let createGearUsecase: CreateGearUsecase;
   let deleteGearUsecase: DeleteGearUsecase;
   let getGearUsecase: GetGearUsecase;
   let updateGearUsecase: UpdateGearUsecase;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [GearController],
         providers: [
            {
               provide: GearModule.GET_GEAR_USECASES_PROXY,
               useValue: new UseCaseProxy(new GetGearUsecase(
                  gearRepository,
                  cacheService
               )),
            },
            {
               provide: GearModule.CREATE_GEAR_USECASES_PROXY,
               useValue: new UseCaseProxy(new CreateGearUsecase(
                  gearRepository,
               )),
            },
            {
               provide: GearModule.UPDATE_GEAR_USECASES_PROXY,
               useValue: new UseCaseProxy(new UpdateGearUsecase(
                  gearRepository,
               )),
            },
            {
               provide: GearModule.DELETE_GEAR_USECASES_PROXY,
               useValue: new UseCaseProxy(new DeleteGearUsecase(
                  gearRepository,
               )),
            },
         ],
      }).compile();

      controller = module.get<GearController>(GearController);
      createGearUsecase = module.get<UseCaseProxy<CreateGearUsecase>>(GearModule.CREATE_GEAR_USECASES_PROXY).getInstance();
      deleteGearUsecase = module.get<UseCaseProxy<DeleteGearUsecase>>(GearModule.DELETE_GEAR_USECASES_PROXY).getInstance();
      getGearUsecase = module.get<UseCaseProxy<GetGearUsecase>>(GearModule.GET_GEAR_USECASES_PROXY).getInstance();
      updateGearUsecase = module.get<UseCaseProxy<UpdateGearUsecase>>(GearModule.UPDATE_GEAR_USECASES_PROXY).getInstance();
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   describe('getGear', () => {
      it('should return an array of GearPresenter', async () => {
         jest.spyOn(getGearUsecase, 'execute').mockResolvedValue(gearsMock.map(presenter => gearEntityMock));

         expect(await controller.getGear('athleteId', 'id')).toEqual(gearsMock);
      });
   });

   describe('create', () => {
      it('should return a GearPresenter', async () => {
         jest.spyOn(createGearUsecase, 'execute').mockResolvedValue(gearEntityMock);

         expect(await controller.create('athleteId', createGearMock)).toEqual(gearMock);
      });
   });

   describe('update', () => {
      it('should return an updated GearPresenter', async () => {
         jest.spyOn(updateGearUsecase, 'execute').mockResolvedValue(gearEntityMock);

         expect(await controller.update('1', updateGearMock)).toEqual(gearMock);
      });
   });

   describe('delete', () => {
      it('should return a deleted GearPresenter', async () => {
         jest.spyOn(deleteGearUsecase, 'execute').mockResolvedValue(gearEntityMock);

         expect(await controller.delete('1')).toEqual(gearMock);
      });
   });
});