import { PaginationTemplate } from '@/@types/pagination-template.type';
import { QueryTemplateDto } from '@/shared/dtos/query-template.dto';
import { AppError } from '@/shared/utils/appError.exception';
import { MAIN_DB } from '@/shared/utils/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from '../entities/level.entity';

@Injectable()
export class FindLevelService {
  constructor(
    @InjectRepository(Level, MAIN_DB)
    private readonly levelRepository: Repository<Level>,
  ) {}
  
  async findAll(
    query: QueryTemplateDto,
  ): Promise<PaginationTemplate<Level>> {
    const { page = 1, limit = 10, search } = query;

    const [data, total] = await this.levelRepository.findAndCount({
      where: search ? { nivel: search } : {},
      take: limit,
      skip: (page - 1) * limit,
    });

    if (!data.length) {
      throw new AppError({
        id: 'LEVELS_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
        message: 'Levels not found.',
      })
    }

    return {
      data,
      meta: {
        current_page: page,
        from: (page - 1) * limit + 1,
        last_page: Math.ceil(total / limit),
        per_page: limit,
        to: Math.min(page * limit, total),
        total,
      },
    };
  }

  async findOne(id: number): Promise<Level> {
    const level = await this.levelRepository.findOne({
      where: { id },
    });

    if (!level) {
      throw new AppError({
        id: 'LEVEL_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
        message: 'Level not found.',
      });
    }

    return level;
  }
}
