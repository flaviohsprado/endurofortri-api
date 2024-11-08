import { AthleteRepository } from "@/modules/athlete/athlete.repository";
import { GetAthleteUsecase } from "@/modules/athlete/usecases/get-athlete.usecase";
import { CacheService } from "@/services/cache/cache.service";
import { createMock } from "@golevelup/ts-jest";
import { NotFoundException } from "@nestjs/common";
import { athleteMock } from "../../../mock/athlete.mock";

describe('GetAthleteUsecase', () => {
   let getAthleteUsecase: GetAthleteUsecase;
   let athleteRepository: AthleteRepository;
   let cacheService: CacheService;

   beforeEach(() => {
      athleteRepository = createMock<AthleteRepository>();
      cacheService = createMock<CacheService>();
      getAthleteUsecase = new GetAthleteUsecase(
         athleteRepository,
         cacheService,
      );
   });

   describe('execute', () => {
      it('should return an athlete from cache if found', async () => {
         const id = '1';

         jest.spyOn(cacheService, 'getCachedObject').mockResolvedValue(athleteMock);

         const result = await getAthleteUsecase.execute(id);

         expect(result).toEqual(athleteMock);
         expect(cacheService.getCachedObject).toHaveBeenCalledWith(`athlete:${id}`);
      });

      it('should return an athlete from repository if not found in cache', async () => {
         const id = '1';

         jest.spyOn(cacheService, 'getCachedObject').mockResolvedValue(null);
         jest.spyOn(athleteRepository, 'findById').mockResolvedValue(athleteMock);
         jest.spyOn(cacheService, 'setObjectInCache').mockResolvedValue(undefined);

         const result = await getAthleteUsecase.execute(id);

         expect(result).toEqual(athleteMock);
         expect(cacheService.getCachedObject).toHaveBeenCalledWith(`athlete:${id}`);
         expect(athleteRepository.findById).toHaveBeenCalledWith(id);
         expect(cacheService.setObjectInCache).toHaveBeenCalledWith(`athlete:${id}`, athleteMock);
      });

      it('should throw an error if athlete is not found', async () => {
         const id = '1';

         jest.spyOn(cacheService, 'getCachedObject').mockResolvedValue(null);
         jest.spyOn(athleteRepository, 'findById').mockResolvedValue(null);

         try {
            await getAthleteUsecase.execute(id)
         } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
         }

         expect(cacheService.getCachedObject).toHaveBeenCalledWith(`athlete:${id}`);
         expect(athleteRepository.findById).toHaveBeenCalledWith(id);
      });
   });
});