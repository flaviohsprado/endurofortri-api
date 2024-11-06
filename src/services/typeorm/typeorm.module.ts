import { EnvironmentConfigModule } from '@/common/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '@/common/config/environment-config/environment-config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmModuleOptions = (
   config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
   ({
      type: config.getDatabaseType(),
      host: config.getDatabaseHost(),
      port: config.getDatabasePort(),
      username: config.getDatabaseUser(),
      password: config.getDatabasePassword(),
      database: config.getDatabaseName(),
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
export class TypeOrmConfigModule { }
