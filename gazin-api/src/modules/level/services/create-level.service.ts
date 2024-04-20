import { AppError } from '@/shared/utils/appError.exception';
import { MAIN_DB } from '@/shared/utils/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLevelDto } from '../dto/create-level.dto';
import { Level } from '../entities/level.entity';

@Injectable()
export class CreateLevelService {
  constructor(
    @InjectRepository(Level, MAIN_DB)
    private readonly levelRepository: Repository<Level>,
  ) {}
  
  async execute(createLevelDto: CreateLevelDto): Promise<Level> {
    const level = this.levelRepository.create(createLevelDto);

    try {
      return await this.levelRepository.save(level);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_CREATE_LEVEL',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error to create level.',
        error,
      })
    }
  }
}
