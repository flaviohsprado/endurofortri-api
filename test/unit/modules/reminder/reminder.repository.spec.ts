import { Reminder } from '@/modules/reminder/reminder.entity';
import { ReminderRepository } from '@/modules/reminder/reminder.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReminderMock, reminderEntityMock, reminderMock, updateReminderMock } from '../../mock/reminder.mock';

describe('ReminderRepository', () => {
   let repository: ReminderRepository;
   let mockRepository: Repository<Reminder>;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            ReminderRepository,
            {
               provide: getRepositoryToken(Reminder),
               useClass: Repository,
            },
         ],
      }).compile();

      repository = module.get<ReminderRepository>(ReminderRepository);
      mockRepository = module.get<Repository<Reminder>>(getRepositoryToken(Reminder));
   });

   it('should be defined', () => {
      expect(repository).toBeDefined();
   });

   describe('findAll', () => {
      it('should return an array of reminders by gearId', async () => {
         const gearId = 'gearId';
         const reminders = [{ id: '1', gear_id: gearId }];
         jest.spyOn(mockRepository, 'find').mockResolvedValue(reminders as Reminder[]);

         expect(await repository.findAll(gearId)).toEqual(reminders);
      });
   });

   describe('create', () => {
      it('should create and return a new reminder', async () => {
         jest.spyOn(mockRepository, 'create').mockReturnValue(reminderEntityMock);
         jest.spyOn(mockRepository, 'save').mockResolvedValue(reminderEntityMock);

         expect(await repository.create(createReminderMock)).toEqual(reminderMock);
      });
   });

   describe('update', () => {
      it('should update and return the updated reminder', async () => {
         const id = '1';

         jest.spyOn(mockRepository, 'create').mockReturnValue(reminderEntityMock);
         jest.spyOn(mockRepository, 'update').mockResolvedValue(undefined);
         jest.spyOn(mockRepository, 'findOne').mockResolvedValue(reminderEntityMock);

         expect(await repository.update(id, updateReminderMock)).toEqual(reminderEntityMock);
      });
   });

   describe('delete', () => {
      it('should delete and return the deleted reminder', async () => {
         const id = '1';

         jest.spyOn(mockRepository, 'findOne').mockResolvedValue(reminderEntityMock);
         jest.spyOn(mockRepository, 'delete').mockResolvedValue(undefined);

         expect(await repository.delete(id)).toEqual(reminderEntityMock);
      });

      it('should return undefined if reminder not found', async () => {
         const id = '1';
         jest.spyOn(mockRepository, 'findOne').mockResolvedValue(undefined);

         expect(await repository.delete(id)).toBeUndefined();
      });
   });
});