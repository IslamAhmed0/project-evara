import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configservice: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configservice.get('DB_HOST'),
      port: configservice.get('DB_PORT'),
      username: configservice.get('DB_USERNAME'),
      password: configservice.get('DB_PASSWORD'),
      database: configservice.get('DB_NAME'),
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configservice: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configservice),
  inject: [ConfigService],
};
