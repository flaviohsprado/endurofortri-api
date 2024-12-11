import { AthleteRepository } from '@/modules/athlete/athlete.repository';
import { CreateAthleteUsecase } from '@/modules/athlete/usecases/create-athlete.usecase';
import { BcryptService } from '@/services/bcrypt/bcrypt.service';
import { JwtTokenService } from '@/services/jwt/jwt.service';
import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { athleteMock, athletePresenterMock, createAthleteMock } from '../../../mock/athlete.mock';

describe('CreateAthleteUsecase', () => {
   let usecase: CreateAthleteUsecase;
   let athleteRepository: jest.Mocked<AthleteRepository>;
   let bcryptService: jest.Mocked<BcryptService>;
   let jwtTokenService: jest.Mocked<JwtTokenService>;

   const mockToken = 'mock.jwt.token';

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            CreateAthleteUsecase,
            {
               provide: AthleteRepository,
               useValue: {
                  alreadyExists: jest.fn(),
                  create: jest.fn(),
               },
            },
            {
               provide: BcryptService,
               useValue: {
                  createHash: jest.fn(),
               },
            },
            {
               provide: JwtTokenService,
               useValue: {
                  createToken: jest.fn(),
               },
            },
         ],
      }).compile();

      usecase = module.get<CreateAthleteUsecase>(CreateAthleteUsecase);
      athleteRepository = module.get(AthleteRepository);
      bcryptService = module.get(BcryptService);
      jwtTokenService = module.get(JwtTokenService);
   });

   it('should be defined', () => {
      expect(usecase).toBeDefined();
   });

   describe('execute', () => {
      it('should successfully create an athlete', async () => {
         // Arrange
         athleteRepository.alreadyExists.mockResolvedValue(false);
         bcryptService.createHash.mockResolvedValue('hashedPassword');
         athleteRepository.create.mockResolvedValue(athleteMock);
         jwtTokenService.createToken.mockReturnValue(mockToken);

         // Act
         const result = await usecase.execute(createAthleteMock);

         // Assert
         expect(athleteRepository.alreadyExists).toHaveBeenCalledWith('email', createAthleteMock.email);
         expect(bcryptService.createHash).toHaveBeenCalledWith(createAthleteMock.password);
         expect(athleteRepository.create).toHaveBeenCalledWith({
            ...createAthleteMock,
            password: 'hashedPassword',
         });
         expect(jwtTokenService.createToken).toHaveBeenCalledWith({
            id: athletePresenterMock.id,
            email: createAthleteMock.email,
            name: createAthleteMock.name,
         });
         expect(result).toEqual({
            ...athletePresenterMock,
            access_token: mockToken,
         });
      });

      it('should throw ForbiddenException when email already exists', async () => {
         jest.spyOn(athleteRepository, 'alreadyExists').mockResolvedValue(true);

         try {
            await usecase.execute(createAthleteMock);
         } catch (error) {
            expect(error).toBeInstanceOf(ForbiddenException);
         }
      });

      it('should handle errors during athlete creation', async () => {
         jest.spyOn(athleteRepository, 'alreadyExists').mockResolvedValue(false);
         jest.spyOn(bcryptService, 'createHash').mockResolvedValue('hashedPassword');
         jest.spyOn(athleteRepository, 'create').mockRejectedValue(new Error('Database error'));

         await expect(usecase.execute(createAthleteMock)).rejects.toThrow('Database error');

         expect(athleteRepository.alreadyExists).toHaveBeenCalledWith('email', createAthleteMock.email);
         expect(bcryptService.createHash).toHaveBeenCalledWith(createAthleteMock.password);
         expect(athleteRepository.create).toHaveBeenCalled();
         expect(jwtTokenService.createToken).not.toHaveBeenCalled();
      });
   });
}); 