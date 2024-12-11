import { AuthDTO } from '@/modules/auth/presenters/auth.dto';
import { AuthPresenter } from '@/modules/auth/presenters/auth.presenter';

export const authCredentials: AuthDTO = {
   email: 'test@test.com',
   password: 'hashedPassword',
};

export const authPresenter: AuthPresenter = {
   id: '1',
   email: 'test@test.com',
   name: 'Test',
   strava_access_token: 'stravaAccessToken',
   access_token: 'accessToken',
};

export const mockForgotPasswordData = {
   email: 'test@example.com',
};

export const mockResetPasswordData = {
   resetToken: 'valid-token',
   newPassword: 'newPassword123',
};

