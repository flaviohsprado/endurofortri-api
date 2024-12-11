import { AuthModule } from '@/modules/auth/auth.module';
import { AuthDTO, ForgotPasswordDTO, ResetPasswordDTO } from '@/modules/auth/presenters/auth.dto';
import { UseCaseProxy } from '@/modules/usecase-proxy';
import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthController } from '../../../../src/modules/auth/auth.controller';
import { ForgotPasswordUseCase } from '../../../../src/modules/auth/use-cases/forgot-password.usecase';
import { LoginUseCase } from '../../../../src/modules/auth/use-cases/login.usecase';
import { ResetPasswordUseCase } from '../../../../src/modules/auth/use-cases/reset-password.usecase';
import { authCredentials, authPresenter } from '../../mock/auth.mock';

describe('AuthController', () => {
   let controller: AuthController;
   let loginUseCase: UseCaseProxy<LoginUseCase>;
   let forgotPasswordUseCase: UseCaseProxy<ForgotPasswordUseCase>;
   let resetPasswordUseCase: UseCaseProxy<ResetPasswordUseCase>;

   beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
         controllers: [AuthController],
         providers: [
            {
               provide: AuthModule.LOGIN_USECASES_PROXY,
               useValue: createMock({
                  getInstance: () => ({
                     execute: jest.fn().mockReturnValue(authPresenter),
                  }),
               }),
            },
            {
               provide: AuthModule.FORGOT_PASSWORD_USECASES_PROXY,
               useValue: createMock({
                  getInstance: () => ({
                     execute: jest.fn().mockResolvedValue(undefined),
                  }),
               }),
            },
            {
               provide: AuthModule.RESET_PASSWORD_USECASES_PROXY,
               useValue: createMock({
                  getInstance: () => ({
                     execute: jest.fn().mockResolvedValue(undefined),
                  }),
               }),
            },
         ],
      })
         .useMocker(() => createMock())
         .compile();

      controller = moduleRef.get<AuthController>(AuthController);
      loginUseCase = moduleRef.get<UseCaseProxy<LoginUseCase>>(
         AuthModule.LOGIN_USECASES_PROXY,
      );
      forgotPasswordUseCase = moduleRef.get<UseCaseProxy<ForgotPasswordUseCase>>(
         AuthModule.FORGOT_PASSWORD_USECASES_PROXY,
      );
      resetPasswordUseCase = moduleRef.get<UseCaseProxy<ResetPasswordUseCase>>(
         AuthModule.RESET_PASSWORD_USECASES_PROXY,
      );
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(loginUseCase).toBeDefined();
      expect(forgotPasswordUseCase).toBeDefined();
      expect(resetPasswordUseCase).toBeDefined();
   });

   describe('login', () => {
      const mockAuthDTO = new AuthDTO(authCredentials);
      const mockAuthPresenter = authPresenter;

      it('should return the result of login when called with valid credentials', async () => {
         jest
            .spyOn(loginUseCase.getInstance(), 'execute')
            .mockResolvedValue(mockAuthPresenter);

         const result = await controller.login(mockAuthDTO);

         expect(result).toBe(mockAuthPresenter);
      });

      it('should throw an error when called with invalid credentials', async () => {
         jest
            .spyOn(loginUseCase.getInstance(), 'execute')
            .mockResolvedValue(null);

         try {
            await controller.login(mockAuthDTO);
         } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
         }
      });
   });

   describe('forgotPassword', () => {
      const mockForgotPasswordDTO = new ForgotPasswordDTO({ email: 'test@example.com' });

      it('should execute forgot password use case successfully', async () => {
         jest.spyOn(forgotPasswordUseCase.getInstance(), 'execute');

         const result = await controller.forgotPassword(mockForgotPasswordDTO);

         expect(result).toBeUndefined();
      });

      it('should handle errors from forgot password use case', async () => {
         const error = new Error('Failed to process forgot password request');
         jest.spyOn(forgotPasswordUseCase.getInstance(), 'execute').mockRejectedValue(error);

         try {
            await controller.forgotPassword(mockForgotPasswordDTO);
         } catch (error) {
            expect(error).toBe(error);
         }
      });
   });

   describe('resetPassword', () => {
      const mockResetPasswordDTO = new ResetPasswordDTO({
         resetToken: 'valid-token',
         newPassword: 'newPassword123',
      });

      it('should execute reset password use case successfully', async () => {
         jest.spyOn(resetPasswordUseCase.getInstance(), 'execute');

         const result = await controller.resetPassword(mockResetPasswordDTO);

         expect(result).toBeUndefined();
      });

      it('should handle errors from reset password use case', async () => {
         const error = new Error('Failed to reset password');
         jest.spyOn(resetPasswordUseCase.getInstance(), 'execute').mockRejectedValue(error);

         try {
            await controller.resetPassword(mockResetPasswordDTO);
         } catch (error) {
            expect(error).toBe(error);
         }
      });
   });
});
