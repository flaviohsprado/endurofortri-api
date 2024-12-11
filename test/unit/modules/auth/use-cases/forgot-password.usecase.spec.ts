import { AthleteRepository } from '@/modules/athlete/athlete.repository';
import { ForgotPasswordUseCase } from '@/modules/auth/use-cases/forgot-password.usecase';
import { JwtTokenService } from '@/services/jwt/jwt.service';
import { NodemailerService } from '@/services/mail/nodemailer.service';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { athleteMock } from '../../../mock/athlete.mock';

describe('ForgotPasswordUseCase', () => {
   let useCase: ForgotPasswordUseCase;
   let athleteRepository: jest.Mocked<AthleteRepository>;
   let mailService: jest.Mocked<NodemailerService>;
   let jwtService: jest.Mocked<JwtTokenService>;

   const mockResetToken = 'mock-reset-token';

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            ForgotPasswordUseCase,
            {
               provide: AthleteRepository,
               useValue: {
                  findByKey: jest.fn(),
               },
            },
            {
               provide: NodemailerService,
               useValue: {
                  sendMail: jest.fn(),
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

      useCase = module.get<ForgotPasswordUseCase>(ForgotPasswordUseCase);
      athleteRepository = module.get(AthleteRepository);
      mailService = module.get(NodemailerService);
      jwtService = module.get(JwtTokenService);
   });

   it('should be defined', () => {
      expect(useCase).toBeDefined();
   });

   describe('execute', () => {
      it('should successfully send reset password email', async () => {
         // Arrange
         const request = { email: athleteMock.email };
         athleteRepository.findByKey.mockResolvedValue(athleteMock);
         jwtService.createToken.mockReturnValue(mockResetToken);
         mailService.sendMail.mockResolvedValue(undefined);

         // Act
         await useCase.execute(request);

         // Assert
         expect(athleteRepository.findByKey).toHaveBeenCalledWith('email', request.email);
         expect(jwtService.createToken).toHaveBeenCalledWith(
            {
               id: athleteMock.id,
               email: athleteMock.email,
               name: athleteMock.name,
            },
            '10m'
         );
         expect(mailService.sendMail).toHaveBeenCalledWith(
            athleteMock.email,
            'Password Reset Request',
            'You have requested to reset your password. Please use the code below to reset your password. This code will expire in 10 minutes.',
            mockResetToken
         );
      });

      it('should throw NotFoundException when athlete is not found', async () => {
         // Arrange
         const request = { email: 'nonexistent@example.com' };
         athleteRepository.findByKey.mockResolvedValue(null);

         // Act & Assert
         await expect(useCase.execute(request)).rejects.toThrow(NotFoundException);
         expect(athleteRepository.findByKey).toHaveBeenCalledWith('email', request.email);
         expect(jwtService.createToken).not.toHaveBeenCalled();
         expect(mailService.sendMail).not.toHaveBeenCalled();
      });

      it('should throw error if mail service fails', async () => {
         // Arrange
         const request = { email: athleteMock.email };
         const mailError = new Error('Mail service error');

         athleteRepository.findByKey.mockResolvedValue(athleteMock);
         jwtService.createToken.mockReturnValue(mockResetToken);
         mailService.sendMail.mockRejectedValue(mailError);

         // Act & Assert
         await expect(useCase.execute(request)).rejects.toThrow(mailError);
         expect(athleteRepository.findByKey).toHaveBeenCalledWith('email', request.email);
         expect(jwtService.createToken).toHaveBeenCalled();
         expect(mailService.sendMail).toHaveBeenCalled();
      });
   });
});
