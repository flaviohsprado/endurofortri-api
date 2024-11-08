import { AthleteRepository } from '@/modules/athlete/athlete.repository';
import { CreateAthleteUsecase } from '@/modules/athlete/usecases/create-athlete.usecase';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { createAthleteMock, createdAthleteMock } from '../../../mock/athlete.mock';

describe('CreateAthleteUsecase', () => {
   let createAthleteUsecase: CreateAthleteUsecase;
   let athleteRepository: AthleteRepository;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            CreateAthleteUsecase,
            {
               provide: AthleteRepository,
               useValue: {
                  create: jest.fn(),
               },
            },
         ],
      }).compile();

      createAthleteUsecase = module.get<CreateAthleteUsecase>(CreateAthleteUsecase);
      athleteRepository = module.get<AthleteRepository>(AthleteRepository);
   });

   describe('execute', () => {
      it('should create and return an athlete', async () => {
         jest.spyOn(athleteRepository, 'create').mockResolvedValue(createdAthleteMock);
         const loggerSpy = jest.spyOn(Logger.prototype, 'log');

         const result = await createAthleteUsecase.execute(createAthleteMock);

         expect(result).toEqual(createdAthleteMock);
         expect(athleteRepository.create).toHaveBeenCalledWith(createAthleteMock);
         expect(loggerSpy).toHaveBeenCalledWith(`Creating athlete with name: ${createAthleteMock.name}`);
         expect(loggerSpy).toHaveBeenCalledWith(`Athlete with name: ${createAthleteMock.name} created`);
      });
   });
});