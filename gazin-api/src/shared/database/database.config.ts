import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfig {
  static createTypeOrmOptions(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      url: configService.get('DATABASE_URL'),
      ssl:
        configService.get('NODE_ENV') === 'production'
          ? { rejectUnauthorized: false }
          : false,
      useUTC: true,
      type: 'postgres',
      entities: [],
      synchronize: true,
      logging: false,
      migrationsRun: false,
      migrations: [],
    };
  }
}