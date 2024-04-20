import { MAIN_DB } from '@/shared/utils/constants';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelModule } from '../level/level.module';
import { DeveloperController } from './developer.controller';
import { Developer } from './entities/developer.entity';
import { CreateDeveloperService } from './services/create-developer.service';
import { DeleteDeveloperService } from './services/delete-developer.service';
import { FindDeveloperService } from './services/find-developer.service';
import { UpdateDeveloperService } from './services/update-developer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Developer], MAIN_DB), LevelModule],
  controllers: [DeveloperController],
  providers: [CreateDeveloperService, FindDeveloperService, UpdateDeveloperService, DeleteDeveloperService],
  exports: [FindDeveloperService, TypeOrmModule],
})
export class DeveloperModule {}
