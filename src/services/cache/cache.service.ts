import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
   private readonly logger: Logger;

   constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
      this.logger = new Logger(CacheService.name);
   }

   public async getCachedObject<T>(key: string): Promise<T | null> {
      this.logger.log(`Getting cached object for key: ${key}`);

      const result = await this.cacheManager.get<string>(key);

      this.logger.log(`Cached object for key ${key}: ${result}`);

      return result ? JSON.parse(result) : null;
   }

   public async setObjectInCache(key: string, value: any, ttl: number = 3600): Promise<void> {
      this.logger.log(`Setting cached object for key: ${key}`);

      const valueInString = JSON.stringify(value);
      await this.cacheManager.set(key, valueInString, ttl);
   }
}
