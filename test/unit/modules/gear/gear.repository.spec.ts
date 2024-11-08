import { UpdateGearDTO } from '@/modules/gear/dto/gear.dto';
import { Gear } from '@/modules/gear/gear.entity';
import { GearRepository } from '@/modules/gear/gear.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createGearMock } from '../../mock/gear.mock';

describe('GearRepository', () => {
   let repository: GearRepository;
   let mockRepository: Repository<Gear>;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            GearRepository,
            {
               provide: getRepositoryToken(Gear),
               useClass: Repository,
            },
         ],
      }).compile();

      repository = module.get<GearRepository>(GearRepository);
      mockRepository = module.get<Repository<Gear>>(getRepositoryToken(Gear));
   });

   it('should be defined', () => {
      expect(repository).toBeDefined();
   });

   describe('find', () => {
      it('should return an array of gears by athleteId', async () => {
         const athleteId = 'athleteId';
         const gears = [{ id: '1', athlete_id: athleteId }];
         jest.spyOn(mockRepository, 'find').mockResolvedValue(gears as Gear[]);

         expect(await repository.find(athleteId)).toEqual(gears);
      });

      it('should return an array of gears by athleteId and id', async () => {
         const athleteId = 'athleteId';
         const id = '1';
         const gears = [{ id, athlete_id: athleteId }];
         jest.spyOn(mockRepository, 'find').mockResolvedValue(gears as Gear[]);

         expect(await repository.find(athleteId, id)).toEqual(gears);
      });
   });

   describe('create', () => {
      it('should create and return a new gear', async () => {
         const newGear = { id: '1', ...createGearMock };
         jest.spyOn(mockRepository, 'create').mockReturnValue(newGear as Gear);
         jest.spyOn(mockRepository, 'save').mockResolvedValue(newGear as Gear);

         expect(await repository.create(createGearMock)).toEqual(newGear);
      });
   });

   describe('update', () => {
      it('should update and return the updated gear', async () => {
         const id = '1';
         const updateGearDTO: UpdateGearDTO = { name: 'UpdatedGear' };
         const updatedGear = { id, ...updateGearDTO };
         jest.spyOn(mockRepository, 'create').mockReturnValue(updatedGear as Gear);
         jest.spyOn(mockRepository, 'update').mockResolvedValue(undefined);
         jest.spyOn(mockRepository, 'findOne').mockResolvedValue(updatedGear as Gear);

         expect(await repository.update(id, updateGearDTO)).toEqual(updatedGear);
      });
   });

   describe('delete', () => {
      it('should delete and return the deleted gear', async () => {
         const id = '1';
         const gear = { id, name: 'Gear1' };
         jest.spyOn(mockRepository, 'findOne').mockResolvedValue(gear as Gear);
         jest.spyOn(mockRepository, 'delete').mockResolvedValue(undefined);

         expect(await repository.delete(id)).toEqual(gear);
      });

      it('should return undefined if gear not found', async () => {
         const id = '1';
         jest.spyOn(mockRepository, 'findOne').mockResolvedValue(undefined);

         expect(await repository.delete(id)).toBeUndefined();
      });
   });
});