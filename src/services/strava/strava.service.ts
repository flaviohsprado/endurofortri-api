import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { IStravaActivity } from '@/interfaces/strava.inferface';

@Injectable()
export class StravaService {
  private readonly stravaApiUrl = 'https://www.strava.com/api/v3';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getAthleteActivities(
    accessToken: string,
    after?: number,
    before?: number,
    page: number = 1,
    perPage: number = 30,
  ): Promise<IStravaActivity[]> {
    try {
      const response = await this.httpService.axiosRef.get<IStravaActivity[]>(
        `${this.stravaApiUrl}/athlete/activities`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            after,
            before,
            page,
            per_page: perPage,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message || 'Failed to fetch Strava activities',
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Failed to fetch Strava activities',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async exchangeAuthorizationCode(code: string) {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.stravaApiUrl}/oauth/token`,
        {
          client_id: this.configService.get('STRAVA_CLIENT_ID'),
          client_secret: this.configService.get('STRAVA_CLIENT_SECRET'),
          code,
          grant_type: 'authorization_code',
        },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to exchange authorization code',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.stravaApiUrl}/oauth/token`,
        {
          client_id: this.configService.get('STRAVA_CLIENT_ID'),
          client_secret: this.configService.get('STRAVA_CLIENT_SECRET'),
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to refresh token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
