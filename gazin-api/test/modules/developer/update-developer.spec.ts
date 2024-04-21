import { AppError } from "@/shared/utils/appError.exception";
import { HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { UpdateDeveloperDto } from "../../../src/modules/developer/dto/update-developer.dto";
import { Developer } from "../../../src/modules/developer/entities/developer.entity";
import { FindDeveloperService } from "../../../src/modules/developer/services/find-developer.service";
import { UpdateDeveloperService } from "../../../src/modules/developer/services/update-developer.service";
import { FindLevelService } from "../../../src/modules/level/services/find-level.service";

describe('Update Developer', () => {
  let updateDeveloperService: UpdateDeveloperService;
  let findDeveloperService: FindDeveloperService;
  let findLevelService: FindLevelService;
  let developerRepository: jest.Mocked<Repository<Developer>>;

  beforeEach(() => {
    developerRepository = {
      update: jest.fn(),
    } as unknown as jest.Mocked<Repository<Developer>>;

    findDeveloperService = {
      findOne: jest.fn(),
    } as unknown as FindDeveloperService;

    findLevelService = {
      findOne: jest.fn(),
    } as unknown as FindLevelService;

    updateDeveloperService = new UpdateDeveloperService(
      developerRepository,
      findDeveloperService,
      findLevelService,
    );
  });

  describe('execute', () => {
    it('should update a developer successfully', async () => {
      const developerId = 1;

      const updateDeveloperDto: UpdateDeveloperDto = {
        nome: 'Alison Editado',
        nivelId: 2,
      };

      developerRepository.update.mockResolvedValue({} as any);
      findDeveloperService.findOne = jest.fn().mockResolvedValue({} as Developer);
      jest.spyOn(findLevelService, 'findOne').mockResolvedValue({} as any);

      const updatedDeveloper = await updateDeveloperService.execute(developerId, updateDeveloperDto);

      expect(findDeveloperService.findOne).toHaveBeenCalledWith(developerId);
      expect(findLevelService.findOne).toHaveBeenCalledWith(updateDeveloperDto.nivelId);
      expect(developerRepository.update).toHaveBeenCalledWith(developerId, updateDeveloperDto);
      expect(updatedDeveloper).toBeDefined();
    });
  });

  it('should throw an AppError if developerRepository.update throws an error', async () => {
    const developerId = 1;

    const updateDeveloperDto: UpdateDeveloperDto = {
      nome: 'Alison Updated',
      nivelId: 2,
    };

    const error = new Error('Error to update developer');
    
    developerRepository.update.mockImplementation(() => {
      throw error;
    });
  
    await expect(updateDeveloperService.execute(developerId, updateDeveloperDto)).rejects.toThrow(
      new AppError({
        id: 'ERROR_UPDATE_DEVELOPER',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error to update developer.',
        error,
      }),
    );
  });
});
