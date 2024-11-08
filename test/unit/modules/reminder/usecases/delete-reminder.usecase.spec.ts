import { ReminderRepository } from '@/modules/reminder/reminder.repository';
import { DeleteReminderUsecase } from '@/modules/reminder/usecases/delete-reminder.usecase';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { reminderEntityMock } from '../../../mock/reminder.mock';

describe('DeleteReminderUsecase', () => {
   let usecase: DeleteReminderUsecase;
   let repository: ReminderRepository;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            DeleteReminderUsecase,
            {
               provide: ReminderRepository,
               useValue: {
                  delete: jest.fn(),
               },
            },
         ],
      }).compile();

      usecase = module.get<DeleteReminderUsecase>(DeleteReminderUsecase);
      repository = module.get<ReminderRepository>(ReminderRepository);
   });

   it('should be defined', () => {
      expect(usecase).toBeDefined();
   });

   describe('execute', () => {
      it('should delete and return the deleted reminder', async () => {
         jest.spyOn(repository, 'delete').mockResolvedValue(reminderEntityMock);

         const result = await usecase.execute('6140abca-f98f-4b15-abc0-d46bab55e66b');

         expect(result).toEqual(reminderEntityMock);
         expect(repository.delete).toHaveBeenCalledWith('6140abca-f98f-4b15-abc0-d46bab55e66b');
      });

      it('should throw NotFoundException if reminder not found', async () => {
         const id = '1';
         jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

         try {
            await usecase.execute(id);
         } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
         }
      });
   });
});