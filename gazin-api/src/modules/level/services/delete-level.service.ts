import { AppError } from '@/shared/utils/appError.exception';
import { MAIN_DB } from '@/shared/utils/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from '../entities/level.entity';
import { FindLevelService } from './find-level.service';

@Injectable()
export class DeleteLevelService {
  constructor(
    @InjectRepository(Level, MAIN_DB)
    private readonly levelRepository: Repository<Level>,
    private readonly findLevelService: FindLevelService,
  ) {}
  
  async execute(id: number): Promise<void> {
    const level = await this.findLevelService.findOne(id);

    if (level.developers.length) {
      throw new AppError({
        id: 'LEVEL_HAS_DEVELOPERS',
        status: HttpStatus.BAD_REQUEST,
        message: 'Level has developers associated.',
      });
    }

    try {
      await this.levelRepository.remove(level);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_DELETE_LEVEL',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error to delete level.',
        error,
      });
    }
  }
}
