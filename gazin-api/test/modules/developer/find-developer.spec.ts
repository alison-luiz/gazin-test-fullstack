import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginationTemplate } from '../../../src/@types/pagination-template.type';
import { Developer } from '../../../src/modules/developer/entities/developer.entity';
import { SexType } from "../../../src/modules/developer/enums/sex-type.enum";
import { FindDeveloperService } from '../../../src/modules/developer/services/find-developer.service';
import { QueryTemplateDto } from '../../../src/shared/dtos/query-template.dto';
import { AppError } from '../../../src/shared/utils/appError.exception';

describe('Find Developer', () => {
  let findDeveloperService: FindDeveloperService;
  let developerRepository: jest.Mocked<Repository<Developer>>;

  beforeEach(() => {
    developerRepository = {
      findAndCount: jest.fn(),
    } as unknown as jest.Mocked<Repository<Developer>>;

    findDeveloperService = new FindDeveloperService(developerRepository);
  });

  describe('findAll', () => {
    it('should return a list of developers', async () => {
      const query: QueryTemplateDto = {
        page: 1,
        limit: 10,
        search: 'Alison',
      };

      const developers: Developer[] = [
        {
          id: 1,
          nome: 'Alison',
          sexo: SexType.MALE,
          datanascimento: new Date('1998-06-24'),
          hobby: 'Programar',
          nivelId: 1,
          getAge() {
            return 23;
          },
        },
        {
          id: 2,
          nome: 'Maria',
          sexo: SexType.FEMALE,
          datanascimento: new Date('1990-01-15'),
          hobby: 'Desenvolver',
          nivelId: 2,
          getAge() {
            return 31;
          }
        },
      ];
      
      const total = developers.length;

      const paginationResult: PaginationTemplate<Developer> = {
        data: developers,
        meta: {
          current_page: query.page,
          from: 1,
          last_page: Math.ceil(total / query.limit),
          per_page: query.limit,
          to: total,
          total,
        },
      };

      developerRepository.findAndCount.mockResolvedValue([developers, total]);

      const result = await findDeveloperService.findAll(query);

      expect(result).toEqual(paginationResult);
    });

    it('should throw an error if no developers are found', async () => {
      const query: QueryTemplateDto = {
        page: 1,
        limit: 10,
        search: 'NonexistentName',
      };

      developerRepository.findAndCount.mockResolvedValue([[], 0]);

      await expect(findDeveloperService.findAll(query)).rejects.toThrowError(
        new AppError({
          id: 'DEVELOPERS_NOT_FOUND',
          status: HttpStatus.NOT_FOUND,
          message: 'Developers not found.',
        }),
      );
    });
  });
});

describe('Find Developer', () => {
  describe('findOne', () => {
    let developerRepository: jest.Mocked<Repository<Developer>>;
    let findDeveloperService: FindDeveloperService;

    beforeEach(() => {
      developerRepository = {
        findOne: jest.fn(),
      } as unknown as jest.Mocked<Repository<Developer>>;

      findDeveloperService = new FindDeveloperService(developerRepository);
    });

    it('should return a developer by ID', async () => {
      const developerId = 1;

      const developer: Developer = {
        id: developerId,
        nome: 'Alison',
        sexo: SexType.MALE,
        datanascimento: new Date('1998-06-24'),
        hobby: 'Programar',
        nivelId: 1,
        getAge() {
          return 23;
        },
      };

      developerRepository.findOne.mockResolvedValue(developer);

      const result = await findDeveloperService.findOne(developerId);

      expect(result).toEqual(developer);
    });

    it('should throw an error if developer is not found', async () => {
      const developerId = 999;

      const error = new Error('Developer not found.');

      developerRepository.findOne.mockRejectedValue(error);

      await expect(findDeveloperService.findOne(developerId)).rejects.toThrow(
        new AppError({
          id: 'DEVELOPER_NOT_FOUND',
          status: HttpStatus.NOT_FOUND,
          message: 'Developer not found.',
        }),
      );
    });
  });
});

