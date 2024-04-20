import { AppError } from '@/shared/utils/appError.exception';
import { MAIN_DB } from '@/shared/utils/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Developer } from '../entities/developer.entity';
import { FindDeveloperService } from './find-developer.service';


@Injectable()
export class DeleteDeveloperService {
  constructor(
    @InjectRepository(Developer, MAIN_DB)
    private readonly developerRepository: Repository<Developer>,
    private readonly findDeveloperService: FindDeveloperService,
  ) {}

  async execute(id: number): Promise<void> {
    const developer = await this.findDeveloperService.findOne(id);

    try {
      await this.developerRepository.remove(developer);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_DELETE_DEVELOPER',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error to delete developer.',
        error,
      })
    }
  }
}
