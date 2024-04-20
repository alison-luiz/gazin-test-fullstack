import { AppError } from '@/shared/utils/appError.exception';
import { MAIN_DB } from '@/shared/utils/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateLevelDto } from '../dto/update-level.dto';
import { Level } from '../entities/level.entity';
import { FindLevelService } from './find-level.service';

@Injectable()
export class UpdateLevelService {
  constructor(
    @InjectRepository(Level, MAIN_DB)
    private readonly levelRepository: Repository<Level>,
    private readonly findLevelService: FindLevelService,
  ) {}

  async execute(id: number, updateLevelDto: UpdateLevelDto): Promise<Level> {
    const level = await this.findLevelService.findOne(id);

    const updatedLevel = this.levelRepository.merge(level, updateLevelDto);

    try {
      return await this.levelRepository.save(updatedLevel);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_UPDATE_LEVEL',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error to update level.',
        error,
      });
    }
  }
  
}
