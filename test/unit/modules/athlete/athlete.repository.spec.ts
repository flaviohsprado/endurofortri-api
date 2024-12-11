import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Athlete } from '../../../../src/modules/athlete/athlete.entity';
import { AthleteRepository } from '../../../../src/modules/athlete/athlete.repository';
import { UpdateAthleteDTO } from '../../../../src/modules/athlete/dto/athlete.dto';
import { createAthleteMock } from '../../mock/athlete.mock';

describe('AthleteRepository', () => {
   let athleteRepository: AthleteRepository;
   let repository: Repository<Athlete>;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            AthleteRepository,
            {
               provide: getRepositoryToken(Athlete),
               useClass: Repository,
            },
         ],
      }).compile();

      athleteRepository = module.get<AthleteRepository>(AthleteRepository);
      repository = module.get<Repository<Athlete>>(getRepositoryToken(Athlete));
   });

   describe('findById', () => {
      it('should return an athlete by id', async () => {
         const id = '1';
         const athlete = new Athlete();
         jest.spyOn(repository, 'findOne').mockResolvedValue(athlete);

         expect(await athleteRepository.findById(id)).toEqual(athlete);
      });

      it('should return null when athlete is not found', async () => {
         const id = 'non-existent-id';
         jest.spyOn(repository, 'findOne').mockResolvedValue(null);

         expect(await athleteRepository.findById(id)).toBeNull();
         expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      });
   });

   describe('create', () => {
      it('should create and return a new athlete', async () => {
         const athlete = new Athlete();
         jest.spyOn(repository, 'create').mockReturnValue(athlete);
         jest.spyOn(repository, 'save').mockResolvedValue(athlete);

         expect(await athleteRepository.create(createAthleteMock)).toEqual(athlete);
      });

      it('should handle creation failure', async () => {
         const athlete = new Athlete();
         jest.spyOn(repository, 'create').mockReturnValue(athlete);
         jest.spyOn(repository, 'save').mockRejectedValue(new Error('Database error'));

         await expect(athleteRepository.create(createAthleteMock)).rejects.toThrow('Database error');
      });
   });

   describe('update', () => {
      it('should update and return an athlete', async () => {
         const id = '1';
         const updateDto: UpdateAthleteDTO = { name: 'John Doe Updated' };
         const athlete = new Athlete();
         jest.spyOn(repository, 'create').mockReturnValue(athlete);
         jest.spyOn(repository, 'update').mockResolvedValue(undefined);
         jest.spyOn(repository, 'findOne').mockResolvedValue(athlete);

         expect(await athleteRepository.update(id, updateDto)).toEqual(athlete);
      });

      it('should handle update failure when athlete not found', async () => {
         const id = 'non-existent-id';
         const updateDto: UpdateAthleteDTO = { name: 'John Doe Updated' };
         const athlete = new Athlete();

         jest.spyOn(repository, 'create').mockReturnValue(athlete);
         jest.spyOn(repository, 'update').mockResolvedValue(undefined);
         jest.spyOn(repository, 'findOne').mockResolvedValue(null);

         expect(await athleteRepository.update(id, updateDto)).toBeNull();
      });
   });

   describe('delete', () => {
      it('should delete and return an athlete', async () => {
         const id = '1';
         const athlete = new Athlete();
         jest.spyOn(repository, 'findOne').mockResolvedValue(athlete);
         jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

         expect(await athleteRepository.delete(id)).toEqual(athlete);
      });

      it('should return null when athlete to delete is not found', async () => {
         const id = 'non-existent-id';
         jest.spyOn(repository, 'findOne').mockResolvedValue(null);

         expect(await athleteRepository.delete(id)).toBeUndefined();
      });
   });

   describe('findByKey', () => {
      it('should return an athlete by key-value pair', async () => {
         const athlete = new Athlete();
         jest.spyOn(repository, 'findOne').mockResolvedValue(athlete);

         expect(await athleteRepository.findByKey('email', 'test@example.com')).toEqual(athlete);
         expect(repository.findOne).toHaveBeenCalledWith({
            where: { email: 'test@example.com' },
         });
      });

      it('should return null when athlete is not found', async () => {
         jest.spyOn(repository, 'findOne').mockResolvedValue(null);

         expect(await athleteRepository.findByKey('email', 'notfound@example.com')).toBeNull();
      });
   });

   describe('alreadyExists', () => {
      it('should return true when athlete exists', async () => {
         const athlete = new Athlete();
         jest.spyOn(repository, 'findOne').mockResolvedValue(athlete);

         expect(await athleteRepository.alreadyExists('email', 'test@example.com')).toBeTruthy();
         expect(repository.findOne).toHaveBeenCalledWith({
            where: { email: 'test@example.com' },
         });
      });

      it('should return false when athlete does not exist', async () => {
         jest.spyOn(repository, 'findOne').mockResolvedValue(null);

         expect(await athleteRepository.alreadyExists('email', 'notfound@example.com')).toBeFalsy();
      });
   });
});