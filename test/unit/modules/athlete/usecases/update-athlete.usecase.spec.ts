import { AthleteRepository } from '@/modules/athlete/athlete.repository';
import { UpdateAthleteUsecase } from '@/modules/athlete/usecases/update-athlete.usecase';
import { BcryptService } from '@/services/bcrypt/bcrypt.service';
import { ForbiddenException, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { athleteMock, updateAthleteMock } from '../../../mock/athlete.mock';

describe('UpdateAthleteUsecase', () => {
   let updateAthleteUsecase: UpdateAthleteUsecase;
   let athleteRepository: AthleteRepository;
   let bcryptService: BcryptService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            UpdateAthleteUsecase,
            {
               provide: AthleteRepository,
               useValue: {
                  update: jest.fn(),
                  findById: jest.fn(),
                  alreadyExists: jest.fn(),
               },
            },
            {
               provide: BcryptService,
               useValue: {
                  createHash: jest.fn(),
               },
            },
            {
               provide: Logger,
               useValue: {
                  log: jest.fn(),
               },
            },
         ],
      }).compile();

      updateAthleteUsecase = module.get<UpdateAthleteUsecase>(UpdateAthleteUsecase);
      athleteRepository = module.get<AthleteRepository>(AthleteRepository);
      bcryptService = module.get<BcryptService>(BcryptService);
   });

   it('should be defined', () => {
      expect(updateAthleteUsecase).toBeDefined();
   });

   it('should update an athlete', async () => {
      const id = '1';

      jest.spyOn(athleteRepository, 'update').mockResolvedValue(athleteMock);
      jest.spyOn(bcryptService, 'createHash').mockResolvedValue('hashedPassword');

      const result = await updateAthleteUsecase.execute(id, updateAthleteMock);

      expect(result).toEqual(athleteMock);
      expect(athleteRepository.update).toHaveBeenCalledWith(id, updateAthleteMock);
   });

   it('should log the update process', async () => {
      const id = '1';

      const loggerSpy = jest.spyOn(updateAthleteUsecase['logger'], 'log');
      jest.spyOn(athleteRepository, 'update').mockResolvedValue(athleteMock);
      jest.spyOn(bcryptService, 'createHash').mockResolvedValue('hashedPassword');

      await updateAthleteUsecase.execute(id, updateAthleteMock);

      expect(loggerSpy).toHaveBeenCalledWith(`Updating athlete with name: ${updateAthleteMock.name}`);
      expect(loggerSpy).toHaveBeenCalledWith(`Athlete with name: ${updateAthleteMock.name} updated`);
   });

   it('should throw ForbiddenException when email already exists', async () => {
      jest.spyOn(athleteRepository, 'alreadyExists').mockResolvedValue(true);

      await expect(updateAthleteUsecase.execute(athleteMock.id, updateAthleteMock)).rejects.toThrow(
         ForbiddenException,
      );
      expect(athleteRepository.alreadyExists).toHaveBeenCalledWith('email', updateAthleteMock.email);
      expect(athleteRepository.update).not.toHaveBeenCalled();
   });

   it('should update athlete without password when password is not provided', async () => {
      const dtoWithoutPassword = { name: 'John Updated', email: 'john.updated@example.com' };

      jest.spyOn(athleteRepository, 'alreadyExists').mockResolvedValue(false);
      jest.spyOn(athleteRepository, 'update').mockResolvedValue({
         ...athleteMock,
         ...dtoWithoutPassword,
      });

      const result = await updateAthleteUsecase.execute(athleteMock.id, dtoWithoutPassword);

      expect(athleteRepository.alreadyExists).toHaveBeenCalledWith('email', dtoWithoutPassword.email);
      expect(bcryptService.createHash).not.toHaveBeenCalled();
      expect(athleteRepository.update).toHaveBeenCalledWith(athleteMock.id, dtoWithoutPassword);
      expect(result).toEqual({
         ...athleteMock,
         ...dtoWithoutPassword,
      });
   });

   it('should hash password when password is provided', async () => {
      const dtoWithPassword = {
         name: 'John Updated',
         email: 'john.updated@example.com',
         password: 'password',
      };

      jest.spyOn(athleteRepository, 'alreadyExists').mockResolvedValue(false);
      jest.spyOn(athleteRepository, 'update').mockResolvedValue({
         ...athleteMock,
         ...dtoWithPassword,
      });

      await updateAthleteUsecase.execute(athleteMock.id, dtoWithPassword);

      expect(athleteRepository.update).toHaveBeenCalledWith(athleteMock.id, dtoWithPassword);
   });
});
