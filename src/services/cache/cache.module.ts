import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { CacheService } from './cache.service';

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || 6379;
const redisPassword = process.env.REDIS_PASSWORD || '';
const ttl = 3600; // 1 hour default TTL

@Module({
   imports: [
      CacheModule.registerAsync({
         isGlobal: true,
         useFactory: async () => {
            const client = createClient({
               url: `redis://${redisHost}:${redisPort}`,
               password: redisPassword,
            });

            await client.connect();

            return {
               store: client as any,
               ttl: ttl,
            };
         },
      }),
   ],
   providers: [CacheService],
   exports: [
      CacheService
   ],
})
export class CacheConfigModule { }
