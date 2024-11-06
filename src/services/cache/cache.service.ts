import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';


@Injectable()
export class CacheService {
   constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

   public async getCachedObject(key: string): Promise<any> {
      const result = await this.cacheManager.get<string>(key);
      if (result) return JSON.parse(result);
   }

   public async setObjectInCache(key: string, value: any): Promise<void> {
      const valueInString = JSON.stringify(value);
      await this.cacheManager.set(key, valueInString);
   }
}
