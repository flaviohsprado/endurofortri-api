import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
   constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

   public async getCachedObject<T>(key: string): Promise<T | null> {
      const result = await this.cacheManager.get<string>(key);
      return result ? JSON.parse(result) : null;
   }

   public async setObjectInCache(key: string, value: any, ttl: number = 3600): Promise<void> {
      const valueInString = JSON.stringify(value);
      await this.cacheManager.set(key, valueInString, ttl);
   }
}
