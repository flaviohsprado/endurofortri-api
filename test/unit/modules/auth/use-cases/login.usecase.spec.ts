import { AthleteRepository } from '@/modules/athlete/athlete.repository';
import { AuthDTO } from '@/modules/auth/presenters/auth.dto';
import { LoginUseCase } from '@/modules/auth/use-cases/login.usecase';
import { BcryptService } from '@/services/bcrypt/bcrypt.service';
import { JwtTokenService } from '@/services/jwt/jwt.service';
import { createMock } from '@golevelup/ts-jest';
import { Logger, NotFoundException } from '@nestjs/common';
import { createdAthleteMock } from '../../../mock/athlete.mock';

describe('LoginUseCase', () => {
   let useCase: LoginUseCase;
   let bcryptService: BcryptService;
   let athleteRepository: AthleteRepository;
   let logger: Logger;
   let jwtService: JwtTokenService;

   beforeEach(async () => {
      athleteRepository = createMock<AthleteRepository>({
         findByKey: jest.fn(),
      });
      bcryptService = createMock<BcryptService>({
         checkHash: jest.fn(),
      });
      logger = createMock<Logger>({
         log: jest.fn(),
      });
      jwtService = createMock<JwtTokenService>({
         createToken: jest.fn(),
      });

      useCase = new LoginUseCase(
         jwtService,
         bcryptService,
         athleteRepository,
      );
   });

   it('should be defined', () => {
      expect(athleteRepository).toBeDefined();
   });

   describe('execute', () => {
      it('should throw NotFoundException when user is not found', async () => {
         const credentials: AuthDTO = {
            email: 'test@test.com',
            password: 'password',
         };

         jest.spyOn(useCase, 'validateAthlete').mockResolvedValue(null);

         await expect(useCase.execute(credentials)).rejects.toThrow(
            NotFoundException,
         );
      });

      it('should throw NotFoundException when password does not match', async () => {
         const credentials: AuthDTO = {
            email: 'test@test.com',
            password: 'wrongpassword',
         };

         jest.spyOn(useCase, 'validateAthlete').mockImplementation(() => {
            throw new NotFoundException();
         });

         await expect(useCase.execute(credentials)).rejects.toThrow(
            NotFoundException,
         );
      });

      it('should return AuthPresenter when user is found and password matches', async () => {
         const credentials: AuthDTO = {
            email: 'test@test.com',
            password: 'hashedPassword',
         };

         jest.spyOn(useCase, 'validateAthlete').mockResolvedValue(createdAthleteMock);
         jest.spyOn(jwtService, 'createToken').mockReturnValue('token');

         const result = await useCase.execute(credentials);

         expect(result).toEqual({
            id: createdAthleteMock.id,
            email: createdAthleteMock.email,
            name: createdAthleteMock.name,
            access_token: 'token',
            strava_access_token: createdAthleteMock.strava_access_token,
         });
      });
   });

   describe('validateAthlete', () => {
      it('should throw NotFoundException when user is not found', async () => {
         const email = 'test@test.com';
         const password = 'password';

         jest.spyOn(athleteRepository, 'findByKey').mockResolvedValue(null);

         try {
            await useCase.validateAthlete(email, password);
         } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
         }
      });

      it('should throw NotFoundException when password does not match', async () => {
         const email = 'test@test.com';
         const password = 'wrongpassword';

         jest
            .spyOn(athleteRepository, 'findByKey')
            .mockResolvedValue(createdAthleteMock);
         jest.spyOn(bcryptService, 'checkHash').mockResolvedValue(false);

         try {
            await useCase.validateAthlete(email, password);
         } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
         }
      });

      it('should return user data when user is found and password matches', async () => {
         const email = 'test@test.com';
         const password = 'hashedPassword';
         const athlete = createdAthleteMock;

         delete athlete.password;

         jest
            .spyOn(athleteRepository, 'findByKey')
            .mockResolvedValue(athlete);

         jest.spyOn(bcryptService, 'checkHash').mockResolvedValue(true);

         const result = await useCase.validateAthlete(email, password);

         expect(result).toEqual(athlete);
      });
   });
});
