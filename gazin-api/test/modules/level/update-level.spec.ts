import { Repository } from 'typeorm';
import { CreateLevelDto } from '../../../src/modules/level/dto/create-level.dto';
import { UpdateLevelDto } from '../../../src/modules/level/dto/update-level.dto';
import { Level } from '../../../src/modules/level/entities/level.entity';
import { FindLevelService } from '../../../src/modules/level/services/find-level.service';
import { UpdateLevelService } from '../../../src/modules/level/services/update-level.service';

describe('Update Level', () => {
  let findOneLevelService: FindLevelService;
  let updateLevelService: UpdateLevelService;
  let levelRepository: jest.Mocked<Repository<Level>>;

  beforeEach(async () => {
    levelRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      merge: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Level>>;

    findOneLevelService = new FindLevelService(levelRepository);
    updateLevelService = new UpdateLevelService(
      levelRepository,
      findOneLevelService,
    );
  });

  describe('execute', () => {
    it('should update a level successfully', async () => {
      const createLevelDto: CreateLevelDto = {
        nivel: 'Nome do Nível',
      };

      const level: Level = {
        id: 1,
        ...createLevelDto,
        developers: [],
      };

      const updatedLevel: UpdateLevelDto = {
        nivel: 'Novo Nome do Nível',
      };

      levelRepository.findOne.mockResolvedValue(level);
      levelRepository.save.mockResolvedValue({ ...level, ...updatedLevel });

      const resultUpdate = await updateLevelService.execute(level.id, updatedLevel);
      expect(resultUpdate).toEqual({ ...level, ...updatedLevel });
    });
  });
});