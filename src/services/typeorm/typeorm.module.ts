import { EnvironmentConfigModule } from '@/common/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '@/common/config/environment-config/environment-config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    url: 'postgresql://neondb_owner:FInygJ02aMPE@ep-bold-hall-a8gposrv.eastus2.azure.neon.tech/neondb?sslmode=require',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true, //config.getDatabaseSync(),
    ssl: config.getEnvironment() === 'production',
    //logging: config.getEnvironment() === 'development',
    extra:
      config.getEnvironment() === 'production'
        ? {
            ssl: {
              rejectUnauthorized: false,
              require: true,
            },
          }
        : {},
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
