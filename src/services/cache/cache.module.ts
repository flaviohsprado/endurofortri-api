import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import { CacheService } from './cache.service';

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || 6379;
const timeToLive = 60 * 60 * 24;

@Module({
   imports: [
      CacheModule.register<RedisClientOptions>({
         url: `redis://${redisHost}:${redisPort}`,
         ttl: timeToLive,
      }),
   ],
   providers: [CacheService],
   exports: [
      CacheService
   ],
})
export class CacheConfigModule { }
