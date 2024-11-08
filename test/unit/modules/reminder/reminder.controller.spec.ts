import { ReminderController } from '@/modules/reminder/reminder.controller';
import { ReminderModule } from '@/modules/reminder/reminder.module';
import { ReminderRepository } from '@/modules/reminder/reminder.repository';
import { CreateReminderUsecase } from '@/modules/reminder/usecases/create-reminder.usecase';
import { DeleteReminderUsecase } from '@/modules/reminder/usecases/delete-reminder.usecase';
import { GetReminderUsecase } from '@/modules/reminder/usecases/get-reminder.usecase';
import { UpdateReminderUsecase } from '@/modules/reminder/usecases/update-reminder.usecase';
import { UseCaseProxy } from '@/modules/usecase-proxy';
import { CacheService } from '@/services/cache/cache.service';
import { Test, TestingModule } from '@nestjs/testing';
import { createReminderMock, reminderEntitiesMock, reminderEntityMock, reminderMock, remindersMock, updateReminderMock } from '../../mock/reminder.mock';

describe('ReminderController', () => {
   let controller: ReminderController;
   let reminderRepository: ReminderRepository;
   let cacheService: CacheService;
   let createReminderUsecase: CreateReminderUsecase;
   let deleteReminderUsecase: DeleteReminderUsecase;
   let getReminderUsecase: GetReminderUsecase;
   let updateReminderUsecase: UpdateReminderUsecase;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [ReminderController],
         providers: [
            {
               provide: ReminderModule.GET_REMINDER_USECASES_PROXY,
               useValue: new UseCaseProxy(new GetReminderUsecase(
                  reminderRepository,
                  cacheService
               )),
            },
            {
               provide: ReminderModule.CREATE_REMINDER_USECASES_PROXY,
               useValue: new UseCaseProxy(new CreateReminderUsecase(
                  reminderRepository,
               )),
            },
            {
               provide: ReminderModule.UPDATE_REMINDER_USECASES_PROXY,
               useValue: new UseCaseProxy(new UpdateReminderUsecase(
                  reminderRepository,
               )),
            },
            {
               provide: ReminderModule.DELETE_REMINDER_USECASES_PROXY,
               useValue: new UseCaseProxy(new DeleteReminderUsecase(
                  reminderRepository,
               )),
            },
         ],
      }).compile();

      controller = module.get<ReminderController>(ReminderController);
      createReminderUsecase = module.get<UseCaseProxy<CreateReminderUsecase>>(ReminderModule.CREATE_REMINDER_USECASES_PROXY).getInstance();
      deleteReminderUsecase = module.get<UseCaseProxy<DeleteReminderUsecase>>(ReminderModule.DELETE_REMINDER_USECASES_PROXY).getInstance();
      getReminderUsecase = module.get<UseCaseProxy<GetReminderUsecase>>(ReminderModule.GET_REMINDER_USECASES_PROXY).getInstance();
      updateReminderUsecase = module.get<UseCaseProxy<UpdateReminderUsecase>>(ReminderModule.UPDATE_REMINDER_USECASES_PROXY).getInstance();
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   describe('getReminder', () => {
      it('should return an array of ReminderPresenter', async () => {
         jest.spyOn(getReminderUsecase, 'execute').mockResolvedValue(reminderEntitiesMock.map(presenter => presenter));

         expect(await controller.getReminder('gearId')).toEqual(remindersMock);
      });
   });

   describe('createReminder', () => {
      it('should return a ReminderPresenter', async () => {
         jest.spyOn(createReminderUsecase, 'execute').mockResolvedValue(reminderEntityMock);

         expect(await controller.createReminder('gearId', createReminderMock)).toEqual(reminderMock);
      });
   });

   describe('updateReminder', () => {
      it('should return an updated ReminderPresenter', async () => {
         jest.spyOn(updateReminderUsecase, 'execute').mockResolvedValue(reminderEntityMock);

         expect(await controller.updateReminder('1', updateReminderMock)).toEqual(reminderMock);
      });
   });

   describe('deleteReminder', () => {
      it('should return a deleted ReminderPresenter', async () => {
         jest.spyOn(deleteReminderUsecase, 'execute').mockResolvedValue(reminderEntityMock);

         expect(await controller.deleteReminder('1')).toEqual(reminderMock);
      });
   });
});