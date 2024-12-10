import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
   constructor(private configService: ConfigService) { }

   //REDIS
   public getRedisHost(): string {
      return this.configService.get<string>('REDIS_HOST');
   }

   public getRedisPort(): number {
      return this.configService.get<number>('REDIS_PORT');
   }

   //AMBIENT
   public getEnvironment(): string {
      return this.configService.get<string>('ENVIRONMENT');
   }

   //JWT
   public getJwtSecret(): string {
      return this.configService.get<string>('JWT_SECRET');
   }

   public getJwtExpirationTime(): string {
      return this.configService.get<string>('JWT_EXPIRATION_TIME');
   }

   //DATABASE
   public getDatabaseUrl(): string {
      return this.configService.get<string>('DATABASE_URL');
   }
}
