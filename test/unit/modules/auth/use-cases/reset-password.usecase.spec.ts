import { AthleteRepository } from '@/modules/athlete/athlete.repository';
import { ResetPasswordDTO } from '@/modules/auth/presenters/auth.dto';
import { ResetPasswordUseCase } from '@/modules/auth/use-cases/reset-password.usecase';
import { BcryptService } from '@/services/bcrypt/bcrypt.service';
import { JwtTokenService } from '@/services/jwt/jwt.service';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('ResetPasswordUseCase', () => {
   let useCase: ResetPasswordUseCase;
   let athleteRepository: jest.Mocked<AthleteRepository>;
   let bcryptService: jest.Mocked<BcryptService>;
   let jwtService: jest.Mocked<JwtTokenService>;

   const mockResetPasswordDTO: ResetPasswordDTO = {
      resetToken: 'valid.reset.token',
      newPassword: 'newPassword123',
   };

   const mockDecodedToken = {
      id: 'user-123',
      email: 'athlete@example.com',
   };

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            ResetPasswordUseCase,
            {
               provide: AthleteRepository,
               useValue: {
                  update: jest.fn(),
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
                  verifyToken: jest.fn(),
               },
            },
         ],
      }).compile();

      useCase = module.get<ResetPasswordUseCase>(ResetPasswordUseCase);
      athleteRepository = module.get(AthleteRepository);
      bcryptService = module.get(BcryptService);
      jwtService = module.get(JwtTokenService);
   });

   describe('execute', () => {
      it('should successfully reset password when token is valid', async () => {
         // Arrange
         const hashedPassword = 'hashedPassword123';
         jwtService.verifyToken.mockReturnValue(mockDecodedToken);
         bcryptService.createHash.mockResolvedValue(hashedPassword);
         athleteRepository.update.mockResolvedValue(undefined);

         // Act
         await useCase.execute(mockResetPasswordDTO);

         // Assert
         expect(jwtService.verifyToken).toHaveBeenCalledWith(mockResetPasswordDTO.resetToken);
         expect(bcryptService.createHash).toHaveBeenCalledWith(mockResetPasswordDTO.newPassword);
         expect(athleteRepository.update).toHaveBeenCalledWith(mockDecodedToken.id, {
            password: hashedPassword,
         });
      });

      it('should throw UnauthorizedException when token is invalid', async () => {
         // Arrange
         jwtService.verifyToken.mockImplementation(() => {
            throw new Error('Invalid token');
         });

         // Act & Assert
         await expect(useCase.execute(mockResetPasswordDTO)).rejects.toThrow(
            UnauthorizedException,
         );
         expect(bcryptService.createHash).not.toHaveBeenCalled();
         expect(athleteRepository.update).not.toHaveBeenCalled();
      });

      it('should throw UnauthorizedException when password update fails', async () => {
         // Arrange
         jwtService.verifyToken.mockReturnValue(mockDecodedToken);
         bcryptService.createHash.mockResolvedValue('hashedPassword123');
         athleteRepository.update.mockRejectedValue(new Error('Database error'));

         // Act & Assert
         await expect(useCase.execute(mockResetPasswordDTO)).rejects.toThrow(
            UnauthorizedException,
         );
      });
   });
});
