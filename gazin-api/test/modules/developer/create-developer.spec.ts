import { HttpStatus } from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";
import { CreateDeveloperDto } from "../../../src/modules/developer/dto/create-developer.dto";
import { Developer } from "../../../src/modules/developer/entities/developer.entity";
import { SexType } from "../../../src/modules/developer/enums/sex-type.enum";
import { CreateDeveloperService } from "../../../src/modules/developer/services/create-developer.service";
import { FindLevelService } from "../../../src/modules/level/services/find-level.service";
import { AppError } from "../../../src/shared/utils/appError.exception";

describe('Create Developer', () => {
  let createDeveloperService: CreateDeveloperService;
  let findLevelService: FindLevelService;
  let developerRepository: jest.Mocked<Repository<Developer>>;

  beforeEach(() => {
    developerRepository = {
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Developer>>;

    findLevelService = {
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Júnior' }),
    } as unknown as FindLevelService;

    createDeveloperService = new CreateDeveloperService(
      developerRepository,
      findLevelService,
    );
  });

  describe('execute', () => {
    it('should create a new developer successfully', async () => {
      const createDeveloperDto: CreateDeveloperDto = {
        nome: 'Alison',
        sexo: SexType.MALE,
        datanascimento: new Date('1998-06-24'),
        hobby: 'Programar',
        nivelId: 1,
      };

      const developerData: DeepPartial<Developer> = {
        ...createDeveloperDto,
      };
    
      developerRepository.create.mockReturnValue(await Promise.resolve(developerData as Developer));
      developerRepository.save.mockReturnValue(Promise.resolve(developerData as Developer));
    
      const developer = await createDeveloperService.execute(createDeveloperDto);

      expect(findLevelService.findOne).toHaveBeenCalledWith(1);

      expect(developer.nome).toEqual('Alison');
      expect(developer.sexo).toEqual(SexType.MALE);
      expect(developer.datanascimento).toEqual(new Date('1998-06-24'));
      expect(developer.hobby).toEqual('Programar');
      expect(developer.nivelId).toEqual(1);
    });

    it('should throw an error if level not found', async () => {
      const createDeveloperDto: CreateDeveloperDto = {
        nome: 'Alison',
        sexo: SexType.MALE,
        datanascimento: new Date('1998-06-24'),
        hobby: 'Programar',
        nivelId: 1,
      };

      const error = new Error('Error to create developer.');

      findLevelService.findOne = jest.fn().mockRejectedValue(error);

      await expect(createDeveloperService.execute(createDeveloperDto)).rejects.toThrow(
        new AppError({
          id: 'ERROR_CREATE_DEVELOPER',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to create developer.',
          error,
        }),
      )
    });
  });
});
