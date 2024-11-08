import { ReminderRepository } from '@/modules/reminder/reminder.repository';
import { UpdateReminderUsecase } from '@/modules/reminder/usecases/update-reminder.usecase';
import { Logger } from '@nestjs/common';
import { reminderMock, updateReminderMock } from '../../../mock/reminder.mock';

describe('UpdateReminderUsecase', () => {
   let updateReminderUsecase: UpdateReminderUsecase;
   let reminderRepository: ReminderRepository;
   let logger: Logger;

   beforeEach(() => {
      reminderRepository = {
         update: jest.fn(),
      } as any;

      logger = {
         log: jest.fn(),
      } as any;

      updateReminderUsecase = new UpdateReminderUsecase(reminderRepository);
      (updateReminderUsecase as any).logger = logger;
   });

   it('should update a reminder and log the process', async () => {
      const id = 'reminderId';

      jest.spyOn(reminderRepository, 'update').mockResolvedValue(reminderMock);

      const result = await updateReminderUsecase.execute(id, updateReminderMock);

      expect(logger.log).toHaveBeenCalledWith(`Updating athlete with name: ${updateReminderMock.name}`);
      expect(reminderRepository.update).toHaveBeenCalledWith(id, updateReminderMock);
      expect(logger.log).toHaveBeenCalledWith(`Reminder with name: ${updateReminderMock.name} updated`);
      expect(result).toEqual(reminderMock);
   });
});