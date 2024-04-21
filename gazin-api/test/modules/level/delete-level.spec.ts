import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Developer } from '../../../src/modules/developer/entities/developer.entity';
import { SexType } from '../../../src/modules/developer/enums/sex-type.enum';
import { CreateLevelDto } from '../../../src/modules/level/dto/create-level.dto';
import { Level } from '../../../src/modules/level/entities/level.entity';
import { DeleteLevelService } from '../../../src/modules/level/services/delete-level.service';
import { FindLevelService } from '../../../src/modules/level/services/find-level.service';
import { AppError } from '../../../src/shared/utils/appError.exception';

describe('Delete Level', () => {
  let deleteLevelService: DeleteLevelService;
  let findOneLevelService: FindLevelService;
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

    findOneLevelService = new FindLevelService(levelRepository);
    deleteLevelService = new DeleteLevelService(
      levelRepository,
      findOneLevelService,
    );
  });

  describe('execute', () => {
    it('should throw an AppError if the level has developers', async () => {
      const createLevelDto: CreateLevelDto = {
        nivel: 'Nome do Nível',
      };
      const level: Level = {
        id: 1,
        ...createLevelDto,
        developers: [
          {
            id: 1,
            nome: 'Alison',
            sexo: SexType.MALE,
            hobby: 'Programar',
            datanascimento: new Date('1998-06-24'),
            idade: 23,
          } as unknown as Developer,
        ]
      };

      levelRepository.findOne.mockResolvedValue(level);

      await expect(deleteLevelService.execute(level.id)).rejects.toThrow(
        new AppError({
          id: 'LEVEL_HAS_DEVELOPERS',
          status: HttpStatus.BAD_REQUEST,
          message: 'Level has developers associated.',
        }),
      );
    });
  });
});