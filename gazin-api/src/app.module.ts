import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LevelModule } from './modules/level/level.module';
import { DatabaseModule } from './shared/database/database.module';
import { DeveloperModule } from './modules/developer/developer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    LevelModule,
    DeveloperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
