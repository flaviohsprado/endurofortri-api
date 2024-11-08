import { Logger, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AthleteRepository } from '../../../../../src/modules/athlete/athlete.repository';
import { DeleteAthleteUsecase } from '../../../../../src/modules/athlete/usecases/delete-athlete.usecase';
import { athleteMock } from '../../../mock/athlete.mock';

describe('DeleteAthleteUsecase', () => {
   let deleteAthleteUsecase: DeleteAthleteUsecase;
   let athleteRepository: AthleteRepository;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            DeleteAthleteUsecase,
            {
               provide: AthleteRepository,
               useValue: {
                  delete: jest.fn(),
               },
            },
         ],
      }).compile();

      deleteAthleteUsecase = module.get<DeleteAthleteUsecase>(DeleteAthleteUsecase);
      athleteRepository = module.get<AthleteRepository>(AthleteRepository);
   });

   describe('execute', () => {
      it('should delete and return an athlete', async () => {
         const id = '1';

         jest.spyOn(athleteRepository, 'delete').mockResolvedValue(athleteMock);
         const loggerSpy = jest.spyOn(Logger.prototype, 'log');

         const result = await deleteAthleteUsecase.execute(id);

         expect(result).toEqual(athleteMock);
         expect(athleteRepository.delete).toHaveBeenCalledWith(id);
         expect(loggerSpy).toHaveBeenCalledWith(`Deleting athlete with id: ${id}`);
         expect(loggerSpy).toHaveBeenCalledWith(`Athlete with name: ${athleteMock.name} deleted`);
      });

      it('should throw NotFoundException if athlete is not found', async () => {
         const id = '1';

         jest.spyOn(athleteRepository, 'delete').mockResolvedValue(null);

         await expect(deleteAthleteUsecase.execute(id)).rejects.toThrow(NotFoundException);
         expect(athleteRepository.delete).toHaveBeenCalledWith(id);
      });
   });
});