import { StravaService } from '@/services/strava/strava.service';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('StravaService', () => {
   let service: StravaService;
   let httpService: HttpService;
   let configService: ConfigService;

   const mockHttpService = {
      axiosRef: {
         get: jest.fn(),
         post: jest.fn(),
      },
   };

   const mockConfigService = {
      get: jest.fn(),
   };

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            StravaService,
            {
               provide: HttpService,
               useValue: mockHttpService,
            },
            {
               provide: ConfigService,
               useValue: mockConfigService,
            },
         ],
      }).compile();

      service = module.get<StravaService>(StravaService);
      httpService = module.get<HttpService>(HttpService);
      configService = module.get<ConfigService>(ConfigService);
   });

   afterEach(() => {
      jest.clearAllMocks();
   });

   describe('getAthleteActivities', () => {
      const mockAccessToken = 'mock-access-token';
      const mockActivities = [{ id: 1, name: 'Activity 1' }];

      it('should successfully fetch athlete activities', async () => {
         mockHttpService.axiosRef.get.mockResolvedValueOnce({
            data: mockActivities,
         });

         const result = await service.getAthleteActivities(mockAccessToken);

         expect(result).toEqual(mockActivities);
         expect(mockHttpService.axiosRef.get).toHaveBeenCalledWith(
            'https://www.strava.com/api/v3/athlete/activities',
            {
               headers: {
                  Authorization: `Bearer ${mockAccessToken}`,
               },
               params: {
                  after: undefined,
                  before: undefined,
                  page: 1,
                  per_page: 30,
               },
            },
         );
      });

      it('should throw HttpException when API request fails', async () => {
         const errorMessage = 'API Error';
         mockHttpService.axiosRef.get.mockRejectedValueOnce({
            response: {
               data: { message: errorMessage },
               status: HttpStatus.BAD_REQUEST,
            },
         });

         await expect(service.getAthleteActivities(mockAccessToken)).rejects.toThrow(
            new HttpException(errorMessage, HttpStatus.BAD_REQUEST),
         );
      });
   });

   describe('exchangeAuthorizationCode', () => {
      const mockCode = 'mock-auth-code';
      const mockResponse = {
         access_token: 'mock-access-token',
         refresh_token: 'mock-refresh-token',
      };

      beforeEach(() => {
         mockConfigService.get.mockImplementation((key) => {
            const config = {
               STRAVA_CLIENT_ID: 'mock-client-id',
               STRAVA_CLIENT_SECRET: 'mock-client-secret',
            };
            return config[key];
         });
      });

      it('should successfully exchange authorization code', async () => {
         mockHttpService.axiosRef.post.mockResolvedValueOnce({
            data: mockResponse,
         });

         const result = await service.exchangeAuthorizationCode(mockCode);

         expect(result).toEqual(mockResponse);
         expect(mockHttpService.axiosRef.post).toHaveBeenCalledWith(
            'https://www.strava.com/api/v3/oauth/token',
            {
               client_id: 'mock-client-id',
               client_secret: 'mock-client-secret',
               code: mockCode,
               grant_type: 'authorization_code',
            },
         );
      });

      it('should throw HttpException when exchange fails', async () => {
         mockHttpService.axiosRef.post.mockRejectedValueOnce(new Error());

         await expect(service.exchangeAuthorizationCode(mockCode)).rejects.toThrow(
            new HttpException(
               'Failed to exchange authorization code',
               HttpStatus.INTERNAL_SERVER_ERROR,
            ),
         );
      });
   });

   describe('refreshToken', () => {
      const mockRefreshToken = 'mock-refresh-token';
      const mockResponse = {
         access_token: 'new-access-token',
         refresh_token: 'new-refresh-token',
      };

      beforeEach(() => {
         mockConfigService.get.mockImplementation((key) => {
            const config = {
               STRAVA_CLIENT_ID: 'mock-client-id',
               STRAVA_CLIENT_SECRET: 'mock-client-secret',
            };
            return config[key];
         });
      });

      it('should successfully refresh token', async () => {
         mockHttpService.axiosRef.post.mockResolvedValueOnce({
            data: mockResponse,
         });

         const result = await service.refreshToken(mockRefreshToken);

         expect(result).toEqual(mockResponse);
         expect(mockHttpService.axiosRef.post).toHaveBeenCalledWith(
            'https://www.strava.com/api/v3/oauth/token',
            {
               client_id: 'mock-client-id',
               client_secret: 'mock-client-secret',
               refresh_token: mockRefreshToken,
               grant_type: 'refresh_token',
            },
         );
      });

      it('should throw HttpException when refresh fails', async () => {
         mockHttpService.axiosRef.post.mockRejectedValueOnce(new Error());

         await expect(service.refreshToken(mockRefreshToken)).rejects.toThrow(
            new HttpException(
               'Failed to refresh token',
               HttpStatus.INTERNAL_SERVER_ERROR,
            ),
         );
      });
   });
});