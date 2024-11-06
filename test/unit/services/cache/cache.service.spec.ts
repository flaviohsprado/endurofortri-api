import { CacheService } from '@/services/cache/cache.service';
import { createMock } from '@golevelup/ts-jest';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test } from '@nestjs/testing';
import { Cache } from 'cache-manager';

describe('CacheService', () => {
   let cacheService: CacheService;
   let cacheManager: Cache = createMock();

   beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
         providers: [
            CacheService,
            {
               provide: CACHE_MANAGER,
               useValue: createMock(),
            },
         ],
      })
         .useMocker(() => createMock())
         .compile();

      cacheService = moduleRef.get<CacheService>(CacheService);
      cacheManager = moduleRef.get<Cache>(CACHE_MANAGER);
   });

   it('should get cached object', async () => {
      const key = 'testKey';
      const value = JSON.stringify({ data: 'testData' });

      jest.spyOn(cacheManager, 'get').mockResolvedValue(value);

      const result = await cacheService.getCachedObject(key);

      expect(cacheManager.get).toHaveBeenCalledWith(key);
      expect(result).toEqual(JSON.parse(value));
   });

   it('should return undefined if no cached object', async () => {
      const key = 'testKey';

      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);

      const result = await cacheService.getCachedObject(key);

      expect(cacheManager.get).toHaveBeenCalledWith(key);
      expect(result).toBeUndefined();
   });

   it('should set object in cache', async () => {
      const key = 'testKey';
      const value = { data: 'testData' };

      await cacheService.setObjectInCache(key, value);

      expect(cacheManager.set).toHaveBeenCalledWith(key, JSON.stringify(value));
   });
});
