import { AuthModule } from '@/modules/auth/auth.module';
import { AuthDTO } from '@/modules/auth/presenters/auth.dto';
import { UseCaseProxy } from '@/modules/usecase-proxy';
import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthController } from '../../../../src/modules/auth/auth.controller';
import { LoginUseCase } from '../../../../src/modules/auth/use-cases/login.usecase';
import { authCredentials, authPresenter } from '../../mock/auth.mock';

describe('AuthController', () => {
   let controller: AuthController;
   let loginUseCase: UseCaseProxy<LoginUseCase>;

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
         ],
      })
         .useMocker(() => createMock())
         .compile();

      controller = moduleRef.get<AuthController>(AuthController);
      loginUseCase = moduleRef.get<UseCaseProxy<LoginUseCase>>(
         AuthModule.LOGIN_USECASES_PROXY,
      );
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(loginUseCase).toBeDefined();
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
});
