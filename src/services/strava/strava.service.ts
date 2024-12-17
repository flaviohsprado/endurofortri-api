import { IStravaActivity, IStravaToken } from '@/interfaces/strava.inferface';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StravaService {
  private readonly stravaApiUrl = 'https://www.strava.com/api/v3';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }

  async getActivities(
    access_token: string,
    after?: number,
    before?: number,
    page: number = 1,
    perPage: number = 5,
  ): Promise<IStravaActivity[]> {
    const defaultBefore = before ? before : Math.floor(new Date().getTime() / 1000);

    try {
      const strava_token = await this.generateToken(access_token);

      const response = await this.httpService.axiosRef.get<IStravaActivity[]>(
        `${this.stravaApiUrl}/athlete/activities`,
        {
          headers: {
            Authorization: `Bearer ${strava_token.access_token}`,
          },
          params: {
            after,
            before: defaultBefore,
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

  private async generateToken(code: string) {
    const { data } = await this.httpService.axiosRef.get<IStravaToken>(
      `${this.stravaApiUrl}/oauth/token`,
      {
        params: {
          client_id: this.configService.get('STRAVA_CLIENT_ID'),
          client_secret: this.configService.get('STRAVA_CLIENT_SECRET'),
          code: code,
          grant_type: 'authorization_code',
        },
      },
    );

    return data;
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
