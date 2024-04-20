import { FindLevelService } from '@/modules/level/services/find-level.service';
import { AppError } from '@/shared/utils/appError.exception';
import { MAIN_DB } from '@/shared/utils/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { Developer } from '../entities/developer.entity';


@Injectable()
export class CreateDeveloperService {
  constructor(
    @InjectRepository(Developer, MAIN_DB)
    private readonly developerRepository: Repository<Developer>,
    private readonly findLevelService: FindLevelService,
  ) {}

  async excute(createDeveloperDto: CreateDeveloperDto): Promise<Developer> {
    await this.findLevelService.findOne(createDeveloperDto.nivelId);

    const developer = this.developerRepository.create(createDeveloperDto);

    try {
      return this.developerRepository.save(developer);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_CREATE_DEVELOPER',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error to create developer.',
        error,
      })
    }
  }
}
