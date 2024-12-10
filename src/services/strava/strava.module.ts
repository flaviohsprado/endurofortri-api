import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StravaService } from './strava.service';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [StravaService],
  exports: [StravaService],
})
export class StravaModule {}
