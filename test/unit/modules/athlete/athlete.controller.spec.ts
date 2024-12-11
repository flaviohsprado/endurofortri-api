import { AthleteRepository } from '@/modules/athlete/athlete.repository';
import { BcryptService } from '@/services/bcrypt/bcrypt.service';
import { CacheService } from '@/services/cache/cache.service';
import { JwtTokenService } from '@/services/jwt/jwt.service';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { AthleteController } from '../../../../src/modules/athlete/athlete.controller';
import { AthleteModule } from '../../../../src/modules/athlete/athlete.module';
import { UpdateAthleteDTO } from '../../../../src/modules/athlete/dto/athlete.dto';
import { AthletePresenter } from '../../../../src/modules/athlete/dto/athlete.presenter';
import { CreateAthleteUsecase } from '../../../../src/modules/athlete/usecases/create-athlete.usecase';
import { DeleteAthleteUsecase } from '../../../../src/modules/athlete/usecases/delete-athlete.usecase';
import { GetAthleteUsecase } from '../../../../src/modules/athlete/usecases/get-athlete.usecase';
import { UpdateAthleteUsecase } from '../../../../src/modules/athlete/usecases/update-athlete.usecase';
import { UseCaseProxy } from '../../../../src/modules/usecase-proxy';
import { athleteMock, createAthleteMock } from '../../mock/athlete.mock';

describe('AthleteController', () => {
   let athleteController: AthleteController;
   let athleteRepository: AthleteRepository;
   let cacheService: CacheService;
   let bcryptService: BcryptService;
   let jwtService: JwtTokenService;
   let getAthleteUsecase: GetAthleteUsecase;
   let createAthleteUsecase: CreateAthleteUsecase;
   let updateAthleteUsecase: UpdateAthleteUsecase;
   let deleteAthleteUsecase: DeleteAthleteUsecase;

   beforeEach(async () => {
      athleteRepository = createMock<AthleteRepository>();
      cacheService = createMock<CacheService>();

      const module: TestingModule = await Test.createTestingModule({
         controllers: [AthleteController],
         providers: [
            {
               provide: AthleteModule.GET_ATHLETE_USECASES_PROXY,
               useValue: new UseCaseProxy(new GetAthleteUsecase(
                  athleteRepository,
                  cacheService
               )),
            },
            {
               provide: AthleteModule.CREATE_ATHLETE_USECASES_PROXY,
               useValue: new UseCaseProxy(new CreateAthleteUsecase(
                  athleteRepository,
                  bcryptService,
                  jwtService
               )),
            },
            {
               provide: AthleteModule.UPDATE_ATHLETE_USECASES_PROXY,
               useValue: new UseCaseProxy(new UpdateAthleteUsecase(
                  athleteRepository,
                  bcryptService
               )),
            },
            {
               provide: AthleteModule.DELETE_ATHLETE_USECASES_PROXY,
               useValue: new UseCaseProxy(new DeleteAthleteUsecase(
                  athleteRepository,
               )),
            },
         ],
      }).compile();

      athleteController = module.get<AthleteController>(AthleteController);
      getAthleteUsecase = module.get<UseCaseProxy<GetAthleteUsecase>>(AthleteModule.GET_ATHLETE_USECASES_PROXY).getInstance();
      createAthleteUsecase = module.get<UseCaseProxy<CreateAthleteUsecase>>(AthleteModule.CREATE_ATHLETE_USECASES_PROXY).getInstance();
      updateAthleteUsecase = module.get<UseCaseProxy<UpdateAthleteUsecase>>(AthleteModule.UPDATE_ATHLETE_USECASES_PROXY).getInstance();
      deleteAthleteUsecase = module.get<UseCaseProxy<DeleteAthleteUsecase>>(AthleteModule.DELETE_ATHLETE_USECASES_PROXY).getInstance();
   });

   describe('getAthlete', () => {
      it('should return an athlete', async () => {
         const result = new AthletePresenter(athleteMock);
         jest.spyOn(getAthleteUsecase, 'execute').mockResolvedValue(result);

         expect(await athleteController.getAthlete('1')).toEqual(result);
      });
   });

   describe('create', () => {
      it('should create and return an athlete', async () => {
         const result = new AthletePresenter(athleteMock);
         jest.spyOn(createAthleteUsecase, 'execute').mockResolvedValue(result);

         expect(await athleteController.create(createAthleteMock)).toEqual(result);
      });
   });

   describe('update', () => {
      it('should update and return an athlete', async () => {
         const updateDto: UpdateAthleteDTO = { name: 'John Doe Updated' };
         const result = new AthletePresenter(athleteMock);
         jest.spyOn(updateAthleteUsecase, 'execute').mockResolvedValue(result);

         expect(await athleteController.update('1', updateDto)).toEqual(result);
      });
   });

   describe('delete', () => {
      it('should delete and return an athlete', async () => {
         const result = new AthletePresenter(athleteMock);
         jest.spyOn(deleteAthleteUsecase, 'execute').mockResolvedValue(result);

         expect(await athleteController.delete('1')).toEqual(result);
      });
   });
});