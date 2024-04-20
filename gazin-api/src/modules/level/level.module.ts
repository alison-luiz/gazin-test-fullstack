import { MAIN_DB } from '@/shared/utils/constants';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { LevelController } from './level.controller';
import { CreateLevelService } from './services/create-level.service';
import { DeleteLevelService } from './services/delete-level.service';
import { FindLevelService } from './services/find-level.service';
import { UpdateLevelService } from './services/update-level.service';

@Module({
  imports: [TypeOrmModule.forFeature([Level], MAIN_DB)],
  controllers: [LevelController],
  providers: [
    CreateLevelService,
    UpdateLevelService,
    FindLevelService,
    DeleteLevelService],
  exports: [FindLevelService, TypeOrmModule],
})
export class LevelModule {}
