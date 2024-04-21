import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Developer } from '../../../src/modules/developer/entities/developer.entity';
import { DeleteDeveloperService } from '../../../src/modules/developer/services/delete-developer.service';
import { FindDeveloperService } from '../../../src/modules/developer/services/find-developer.service';
import { AppError } from '../../../src/shared/utils/appError.exception';

describe('Delete Developer', () => {
  let deleteDeveloperService: DeleteDeveloperService;
  let findDeveloperService: FindDeveloperService;
  let developerRepository: jest.Mocked<Repository<Developer>>;

  beforeEach(() => {
    developerRepository = {
      remove: jest.fn(),
    } as unknown as jest.Mocked<Repository<Developer>>;

    findDeveloperService = {
      findOne: jest.fn(),
    } as unknown as FindDeveloperService;

    deleteDeveloperService = new DeleteDeveloperService(
      developerRepository,
      findDeveloperService,
    );
  });

  describe('execute', () => {
    it('should delete a developer successfully', async () => {
      const developerId = 1;

      findDeveloperService.findOne = jest.fn().mockResolvedValue({} as Developer);

      await deleteDeveloperService.execute(developerId);

      expect(findDeveloperService.findOne).toHaveBeenCalledWith(developerId);
      expect(developerRepository.remove).toHaveBeenCalled();
    });

    it('should throw an AppError if developer is not found', async () => {
      const developerId = 999;

      const error = new Error('Developer not found.');

      findDeveloperService.findOne = jest.fn().mockRejectedValueOnce(() => {
        throw error;
      });

      await expect(deleteDeveloperService.execute(developerId)).rejects.toThrow(
        new AppError({
          id: 'DEVELOPER_NOT_FOUND',
          status: HttpStatus.NOT_FOUND,
          message: 'Developer not found.',
        }),
      );

      expect(findDeveloperService.findOne).toHaveBeenCalledWith(developerId);
      expect(developerRepository.remove).not.toHaveBeenCalled();
    });

    it('should throw an AppError if developerRepository.remove throws an error', async () => {
      const developerId = 1;
      
      const error = new Error('Error to delete developer.');

      findDeveloperService.findOne = jest.fn().mockResolvedValue({} as Developer);
      developerRepository.remove.mockRejectedValue(error);

      await expect(deleteDeveloperService.execute(developerId)).rejects.toThrow(
        new AppError({
          id: 'ERROR_DELETE_DEVELOPER',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to delete developer.',
          error,
        }),
      );

      expect(findDeveloperService.findOne).toHaveBeenCalledWith(developerId);
      expect(developerRepository.remove).toHaveBeenCalled();
    });
  });
});