import { SharedEvent } from '@/modules/shared-event/shared-event.entity';
import { SharedEventRepository } from '@/modules/shared-event/shared-event.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createSharedEventMock, sharedEventEntityMock, sharedEventsEntityMock, updateSharedEventMock } from '../../mock/shared-event.mock';

describe('SharedEventRepository', () => {
   let repository: SharedEventRepository;
   let mockRepository: Repository<SharedEvent>;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            SharedEventRepository,
            {
               provide: getRepositoryToken(SharedEvent),
               useClass: Repository,
            },
         ],
      }).compile();

      repository = module.get<SharedEventRepository>(SharedEventRepository);
      mockRepository = module.get<Repository<SharedEvent>>(getRepositoryToken(SharedEvent));
   });

   it('should find shared events by athleteId and id', async () => {
      const athleteId = 'athleteId';
      const id = 'eventId';

      jest.spyOn(mockRepository, 'find').mockResolvedValue(sharedEventsEntityMock);

      const result = await repository.find(athleteId, id);

      expect(mockRepository.find).toHaveBeenCalledWith({ where: { athleteId, id } });
      expect(result).toEqual(sharedEventsEntityMock);
   });

   it('should find shared events by athleteId', async () => {
      const athleteId = 'athleteId';

      jest.spyOn(mockRepository, 'find').mockResolvedValue(sharedEventsEntityMock);

      const result = await repository.find(athleteId);

      expect(mockRepository.find).toHaveBeenCalledWith({ where: { athleteId } });
      expect(result).toEqual(sharedEventsEntityMock);
   });

   it('should create a new shared event', async () => {
      jest.spyOn(mockRepository, 'create').mockReturnValue(sharedEventEntityMock);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(sharedEventEntityMock);

      const result = await repository.create(createSharedEventMock);

      expect(mockRepository.create).toHaveBeenCalledWith(createSharedEventMock);
      expect(mockRepository.save).toHaveBeenCalledWith(sharedEventEntityMock);
      expect(result).toEqual(sharedEventEntityMock);
   });

   it('should update a shared event', async () => {
      const id = 'eventId';

      jest.spyOn(mockRepository, 'create').mockReturnValue(sharedEventEntityMock);
      jest.spyOn(mockRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(sharedEventEntityMock);

      const result = await repository.update(id, updateSharedEventMock);

      expect(mockRepository.create).toHaveBeenCalledWith(updateSharedEventMock);
      expect(mockRepository.update).toHaveBeenCalledWith(id, sharedEventEntityMock);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(sharedEventEntityMock);
   });

   it('should delete a shared event', async () => {
      const id = 'eventId';

      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(sharedEventEntityMock);
      jest.spyOn(mockRepository, 'delete').mockResolvedValue(undefined);

      const result = await repository.delete(id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(mockRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(sharedEventEntityMock);
   });

   it('should return undefined if shared event to delete is not found', async () => {
      const id = 'eventId';
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(undefined);

      const result = await repository.delete(id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toBeUndefined();
   });
});