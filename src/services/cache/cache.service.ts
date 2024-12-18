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
      try {
         this.logger.log(`Getting cached object for key: ${key}`);

         const result = await this.cacheManager.get<string>(key);

         if (!result) {
            this.logger.debug(`No cached value found for key: ${key}`);
            return null;
         }

         try {
            const parsedResult = JSON.parse(result) as T;
            this.logger.debug(`Successfully parsed cached object for key: ${key}`);
            return parsedResult;
         } catch (parseError) {
            this.logger.error(`Error parsing cached value for key ${key}: ${parseError.message}`);
            return null;
         }
      } catch (error) {
         this.logger.error(`Error retrieving cached value for key ${key}: ${error.message}`);
         return null;
      }
   }

   public async setObjectInCache(key: string, value: any, ttl: number = 3600): Promise<void> {
      try {
         this.logger.log(`Setting cached object for key: ${key}`);

         const valueInString = JSON.stringify(value);
         await this.cacheManager.set(key, valueInString, ttl);

         this.logger.debug(`Successfully cached object for key: ${key}`);
      } catch (error) {
         this.logger.error(`Error setting cached value for key ${key}: ${error.message}`);
         throw error;
      }
   }
}
