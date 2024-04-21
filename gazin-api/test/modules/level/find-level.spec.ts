import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateLevelDto } from '../../../src/modules/level/dto/create-level.dto';
import { Level } from '../../../src/modules/level/entities/level.entity';
import { FindLevelService } from '../../../src/modules/level/services/find-level.service';
import { AppError } from '../../../src/shared/utils/appError.exception';

describe('Find Level', () => {
  let findLevelService: FindLevelService;
  let levelRepository: jest.Mocked<Repository<Level>>;

  beforeEach(async () => {
    levelRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn(),
    } as unknown as jest.Mocked<Repository<Level>>;

    findLevelService = new FindLevelService(levelRepository);
  });

  describe('execute', () => {
    it('should find a level successfully', async () => {
      const createLevelDto: CreateLevelDto = {
        nivel: 'Nome do Nível',
      };

      const level: Level = {
        id: 1,
        ...createLevelDto,
        developers: [],
      };

      levelRepository.findOne.mockResolvedValue(level);

      const resultFind = await findLevelService.findOne(level.id);
      expect(resultFind).toEqual(level);
    });

    it('should throw an AppError if the level doenst exist', async () => {
      await expect(findLevelService.findOne(1)).rejects.toThrow(
        new AppError({
          id: 'LEVEL_NOT_FOUND',
          status: HttpStatus.BAD_REQUEST,
          message: 'Level not found.',
        }),
      );
    });
  });
});

describe('Find All Level', () => {
  let findAllLevelsService: FindLevelService;
  let levelRepository: jest.Mocked<Repository<Level>>;

  beforeEach(async () => {
    levelRepository = {
      findAndCount: jest.fn(),
    } as unknown as jest.Mocked<Repository<Level>>;

    findAllLevelsService = new FindLevelService(levelRepository);
  });

  describe('execute', () => {
    it('should find many levels successfully', async () => {
      const createLevelDto: CreateLevelDto = {
        nivel: 'Nome do Nível',
      };
      const levelOne: Level = {
        id: 1,
        ...createLevelDto,
        developers: [],
      };

      const levelTwo: Level = {
        id: 2,
        ...createLevelDto,
        developers: [],
      };

      levelRepository.findAndCount.mockResolvedValue([[levelOne, levelTwo], 2]);

      const resultFind = await findAllLevelsService.findAll({
        page: 1,
        limit: 10,
      });
      expect(resultFind).toEqual({
        data: [levelOne, levelTwo],
        meta: {
          current_page: 1,
          from: 1,
          last_page: 1,
          per_page: 10,
          to: 2,
          total: 2,
        },
      });
    });

    it('should throw an AppError if no data', async () => {
      levelRepository.findAndCount.mockResolvedValue([[], 2]);

      await expect(
        findAllLevelsService.findAll({
          page: 1,
          limit: 10,
        }),
      ).rejects.toThrow(
        new AppError({
          id: 'LEVELS_NOT_FOUND',
          status: HttpStatus.BAD_REQUEST,
          message: 'Levels not found.',
        }),
      );
    });
  });
});