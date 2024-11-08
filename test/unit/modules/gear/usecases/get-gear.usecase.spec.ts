import { GearRepository } from "@/modules/gear/gear.repository";
import { GetGearUsecase } from "@/modules/gear/usecases/get-gear.usecase";
import { CacheService } from "@/services/cache/cache.service";
import { createMock } from "@golevelup/ts-jest";
import { gearEntitiesMock } from "../../../mock/gear.mock";

describe('GetGearUsecase', () => {
   let usecase: GetGearUsecase;
   let repository: GearRepository;
   let cache: CacheService;

   beforeEach(() => {
      repository = createMock<GearRepository>();
      cache = createMock<CacheService>();
      usecase = new GetGearUsecase(
         repository,
         cache,
      );
   });

   it('should be defined', () => {
      expect(usecase).toBeDefined();
   });

   describe('execute', () => {
      it('should return gears from cache if available', async () => {
         const athleteId = 'athleteId';
         const id = '1';

         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(gearEntitiesMock);

         const result = await usecase.execute(athleteId, id);

         expect(result).toEqual(gearEntitiesMock);
         expect(cache.getCachedObject).toHaveBeenCalledWith(`gear:${athleteId}:${id}`);
      });

      it('should return gears from repository if not in cache', async () => {
         const athleteId = 'athleteId';
         const id = '1';

         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(null);
         jest.spyOn(repository, 'find').mockResolvedValue(gearEntitiesMock);

         const result = await usecase.execute(athleteId, id);

         expect(result).toEqual(gearEntitiesMock);
         expect(repository.find).toHaveBeenCalledWith(athleteId, id);
      });

      it('should set gears in cache if not in cache', async () => {
         const athleteId = 'athleteId';
         const id = '1';

         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(null);
         jest.spyOn(repository, 'find').mockResolvedValue(gearEntitiesMock);
         jest.spyOn(cache, 'setObjectInCache').mockResolvedValue(undefined);

         await usecase.execute(athleteId, id);

         expect(cache.setObjectInCache).toHaveBeenCalledWith(`gear:${athleteId}:${id}`, gearEntitiesMock);
      });
   });

   describe('getGearsFromCache', () => {
      it('should return gears from cache by id', async () => {
         const athleteId = 'athleteId';
         const id = '1';

         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(gearEntitiesMock);

         const result = await usecase['getGearsFromCache'](athleteId, id);

         expect(result).toEqual(gearEntitiesMock);
         expect(cache.getCachedObject).toHaveBeenCalledWith(`gear:${athleteId}:${id}`);
      });

      it('should return gears from cache by athleteId', async () => {
         const athleteId = 'athleteId';

         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(gearEntitiesMock);

         const result = await usecase['getGearsFromCache'](athleteId);

         expect(result).toEqual(gearEntitiesMock);
         expect(cache.getCachedObject).toHaveBeenCalledWith(`gears:${athleteId}`);
      });

      it('should return null if gears not in cache', async () => {
         const athleteId = 'athleteId';
         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(null);

         const result = await usecase['getGearsFromCache'](athleteId);

         expect(result).toBeNull();
      });
   });

   describe('setGearsInCache', () => {
      it('should set gears in cache by id', async () => {
         const athleteId = 'athleteId';
         const id = '1';

         jest.spyOn(cache, 'setObjectInCache').mockResolvedValue(undefined);

         await usecase['setGearsInCache'](athleteId, gearEntitiesMock, id);

         expect(cache.setObjectInCache).toHaveBeenCalledWith(`gear:${athleteId}:${id}`, gearEntitiesMock);
      });

      it('should set gears in cache by athleteId', async () => {
         const athleteId = 'athleteId';

         jest.spyOn(cache, 'setObjectInCache').mockResolvedValue(undefined);

         await usecase['setGearsInCache'](athleteId, gearEntitiesMock);

         expect(cache.setObjectInCache).toHaveBeenCalledWith(`gears:${athleteId}`, gearEntitiesMock);
      });
   });
});