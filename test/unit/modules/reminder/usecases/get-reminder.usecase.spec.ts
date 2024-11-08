import { ReminderRepository } from "@/modules/reminder/reminder.repository";
import { GetReminderUsecase } from "@/modules/reminder/usecases/get-reminder.usecase";
import { CacheService } from "@/services/cache/cache.service";

describe('GetReminderUsecase', () => {
   let getReminderUsecase: GetReminderUsecase;
   let reminderRepository: ReminderRepository;
   let cacheService: CacheService;

   beforeEach(() => {
      reminderRepository = {
         findAll: jest.fn(),
      } as any;

      cacheService = {
         getCachedObject: jest.fn(),
         setObjectInCache: jest.fn(),
      } as any;

      getReminderUsecase = new GetReminderUsecase(reminderRepository, cacheService);
   });

   it('should return cached reminders if available', async () => {
      const gearId = 'gearId';
      const cachedReminders = [{ id: '1', name: 'Reminder 1' }];
      (cacheService.getCachedObject as jest.Mock).mockResolvedValue(cachedReminders);

      const result = await getReminderUsecase.execute(gearId);

      expect(cacheService.getCachedObject).toHaveBeenCalledWith(`reminders:${gearId}`);

      expect(result).toEqual(cachedReminders);
   });

   it('should return reminders from repository if not cached and cache them', async () => {
      const gearId = 'gearId';
      const reminders = [{ id: '1', name: 'Reminder 1' }];
      (cacheService.getCachedObject as jest.Mock).mockResolvedValue(null);
      (reminderRepository.findAll as jest.Mock).mockResolvedValue(reminders);

      const result = await getReminderUsecase.execute(gearId);

      expect(cacheService.getCachedObject).toHaveBeenCalledWith(`reminders:${gearId}`);
      expect(reminderRepository.findAll).toHaveBeenCalledWith(gearId);
      expect(result).toEqual(reminders);
   });
});