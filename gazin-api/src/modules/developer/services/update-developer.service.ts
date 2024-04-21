import { FindLevelService } from '@/modules/level/services/find-level.service';
import { AppError } from '@/shared/utils/appError.exception';
import { MAIN_DB } from '@/shared/utils/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { Developer } from '../entities/developer.entity';
import { FindDeveloperService } from './find-developer.service';


@Injectable()
export class UpdateDeveloperService {
  constructor(
    @InjectRepository(Developer, MAIN_DB)
    private readonly developerRepository: Repository<Developer>,
    private readonly findDeveloperService: FindDeveloperService,
    private readonly findLevelService: FindLevelService,
  ) {}

  async execute(id: number, updateDeveloperDto: UpdateDeveloperDto): Promise<Developer> {
    await this.findDeveloperService.findOne(id);
    await this.findLevelService.findOne(updateDeveloperDto.nivelId);

    try {
      await this.developerRepository.update(id, updateDeveloperDto);
      return this.findDeveloperService.findOne(id);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_UPDATE_DEVELOPER',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error to update developer.',
        error,
      });
    }
  }
}
