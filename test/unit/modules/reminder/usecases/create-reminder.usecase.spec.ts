import { ReminderRepository } from '@/modules/reminder/reminder.repository';
import { CreateReminderUsecase } from '@/modules/reminder/usecases/create-reminder.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { createReminderMock, reminderEntityMock } from '../../../mock/reminder.mock';

describe('CreateReminderUsecase', () => {
   let usecase: CreateReminderUsecase;
   let repository: ReminderRepository;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            CreateReminderUsecase,
            {
               provide: ReminderRepository,
               useValue: {
                  create: jest.fn(),
               },
            },
         ],
      }).compile();

      usecase = module.get<CreateReminderUsecase>(CreateReminderUsecase);
      repository = module.get<ReminderRepository>(ReminderRepository);
   });

   it('should be defined', () => {
      expect(usecase).toBeDefined();
   });

   describe('execute', () => {
      it('should create and return a new reminder', async () => {
         jest.spyOn(repository, 'create').mockResolvedValue(reminderEntityMock);

         const result = await usecase.execute(createReminderMock);

         expect(result).toEqual(reminderEntityMock);
         expect(repository.create).toHaveBeenCalledWith(createReminderMock);
      });
   });
});