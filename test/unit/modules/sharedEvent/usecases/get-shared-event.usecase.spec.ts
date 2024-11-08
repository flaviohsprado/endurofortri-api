import { SharedEventRepository } from "@/modules/shared-event/shared-event.repository";
import { GetSharedEventUsecase } from "@/modules/shared-event/usecases/get-shared-event.usecase";
import { CacheService } from "@/services/cache/cache.service";
import { createMock } from "@golevelup/ts-jest";
import { sharedEventsEntityMock } from "../../../mock/shared-event.mock";

describe('GetSharedEventUsecase', () => {
   let usecase: GetSharedEventUsecase;
   let repository: SharedEventRepository;
   let cache: CacheService;

   beforeEach(() => {
      repository = createMock<SharedEventRepository>();
      cache = createMock<CacheService>();
      usecase = new GetSharedEventUsecase(
         repository,
         cache,
      );
   });

   it('should be defined', () => {
      expect(usecase).toBeDefined();
   });

   describe('execute', () => {
      it('should return shared events from cache if available', async () => {
         const athleteId = 'athleteId';
         const id = '1';

         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(sharedEventsEntityMock);

         const result = await usecase.execute(athleteId, id);

         expect(result).toEqual(sharedEventsEntityMock);
         expect(cache.getCachedObject).toHaveBeenCalledWith(`shared-event:${athleteId}:${id}`);
      });

      it('should return shared events from repository if not in cache', async () => {
         const athleteId = 'athleteId';
         const id = '1';

         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(null);
         jest.spyOn(repository, 'find').mockResolvedValue(sharedEventsEntityMock);

         const result = await usecase.execute(athleteId, id);

         expect(result).toEqual(sharedEventsEntityMock);
         expect(repository.find).toHaveBeenCalledWith(athleteId, id);
      });

      it('should set shared events in cache if not in cache', async () => {
         const athleteId = 'athleteId';
         const id = '1';

         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(null);
         jest.spyOn(repository, 'find').mockResolvedValue(sharedEventsEntityMock);
         jest.spyOn(cache, 'setObjectInCache').mockResolvedValue(undefined);

         await usecase.execute(athleteId, id);

         expect(cache.setObjectInCache).toHaveBeenCalledWith(`shared-event:${athleteId}:${id}`, sharedEventsEntityMock);
      });
   });

   describe('getSharedEventsFromCache', () => {
      it('should return sharedEvents from cache by id', async () => {
         const athleteId = 'athleteId';
         const id = '1';

         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(sharedEventsEntityMock);

         const result = await usecase['getSharedEventsFromCache'](athleteId, id);

         expect(result).toEqual(sharedEventsEntityMock);
         expect(cache.getCachedObject).toHaveBeenCalledWith(`shared-event:${athleteId}:${id}`);
      });

      it('should return shared-events from cache by athleteId', async () => {
         const athleteId = 'athleteId';

         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(sharedEventsEntityMock);

         const result = await usecase['getSharedEventsFromCache'](athleteId);

         expect(result).toEqual(sharedEventsEntityMock);
         expect(cache.getCachedObject).toHaveBeenCalledWith(`shared-events:${athleteId}`);
      });

      it('should return null if shared-events not in cache', async () => {
         const athleteId = 'athleteId';
         jest.spyOn(cache, 'getCachedObject').mockResolvedValue(null);

         const result = await usecase['getSharedEventsFromCache'](athleteId);

         expect(result).toBeNull();
      });
   });

   describe('setSharedEventsInCache', () => {
      it('should set sharedEvents in cache by id', async () => {
         const athleteId = 'athleteId';
         const id = '1';

         jest.spyOn(cache, 'setObjectInCache').mockResolvedValue(undefined);

         await usecase['setSharedEventsInCache'](athleteId, sharedEventsEntityMock, id);

         expect(cache.setObjectInCache).toHaveBeenCalledWith(`shared-event:${athleteId}:${id}`, sharedEventsEntityMock);
      });

      it('should set shared-events in cache by athleteId', async () => {
         const athleteId = 'athleteId';

         jest.spyOn(cache, 'setObjectInCache').mockResolvedValue(undefined);

         await usecase['setSharedEventsInCache'](athleteId, sharedEventsEntityMock);

         expect(cache.setObjectInCache).toHaveBeenCalledWith(`shared-events:${athleteId}`, sharedEventsEntityMock);
      });
   });
});