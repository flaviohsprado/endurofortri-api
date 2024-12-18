import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigModule } from '../cache/cache.module';
import { StravaService } from './strava.service';

@Module({
  imports: [HttpModule, ConfigModule, CacheConfigModule],
  providers: [StravaService],
  exports: [StravaService],
})
export class StravaModule { }
