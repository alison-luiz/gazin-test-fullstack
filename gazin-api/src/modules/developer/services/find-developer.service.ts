import { PaginationTemplate } from '@/@types/pagination-template.type';
import { QueryTemplateDto } from '@/shared/dtos/query-template.dto';
import { AppError } from '@/shared/utils/appError.exception';
import { MAIN_DB } from '@/shared/utils/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Developer } from '../entities/developer.entity';

@Injectable()
export class FindDeveloperService {
  constructor(
    @InjectRepository(Developer, MAIN_DB)
    private readonly developerRepository: Repository<Developer>,
  ) {}

  async findAll(
    query: QueryTemplateDto,
  ): Promise<PaginationTemplate<Developer>> {
    const { page = 1, limit = 10, search } = query;

    const [data, total] = await this.developerRepository.findAndCount({
      where: search ? { nome: Like(`%${search}%`) } : {},
      relations: ['level'],
      order: { id: 'ASC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    if (!data.length) {
      throw new AppError({
        id: 'DEVELOPERS_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
        message: 'Developers not found.',
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

  async findOne(id: number): Promise<Developer> {
    const developer = await this.developerRepository.findOne({
      where: { id },
      relations: ['level'],
    });

    if (!developer) {
      throw new AppError({
        id: 'DEVELOPER_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
        message: 'Developer not found.',
      });
    }

    return developer;
  }
}
