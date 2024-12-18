import { IStravaActivity, IStravaRefreshToken, IStravaToken } from '@/interfaces/strava.inferface';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class StravaService {
  private readonly stravaApiUrl = 'https://www.strava.com/api/v3';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
  ) { }

  async getActivities(
    athleteId: string,
    access_token: string,
    after?: number,
    before?: number,
    page: number = 1,
    perPage: number = 5,
  ): Promise<IStravaActivity[]> {
    const defaultBefore = before ? before : Math.floor(new Date().getTime() / 1000);
    let stravaAccessToken;

    try {
      const cachedRefreshToken = await this.cacheService.getCachedObject<string>(`strava_refresh_token:${athleteId}`);

      if (!cachedRefreshToken) {
        const strava_token = await this.generateToken(access_token);
        await this.cacheService.setObjectInCache(`strava_refresh_token:${athleteId}`, strava_token.refresh_token, 604800);
        stravaAccessToken = strava_token.access_token;
      } else {
        const refreshedToken = await this.refreshToken(cachedRefreshToken);
        await this.cacheService.setObjectInCache(`strava_refresh_token:${athleteId}`, refreshedToken.refresh_token, 604800);
        stravaAccessToken = refreshedToken.access_token;
      }

      const response = await this.httpService.axiosRef.get<IStravaActivity[]>(
        `${this.stravaApiUrl}/athlete/activities`,
        {
          headers: {
            Authorization: `Bearer ${stravaAccessToken}`,
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
    const clientId = this.configService.get('STRAVA_CLIENT_ID');
    const clientSecret = this.configService.get('STRAVA_CLIENT_SECRET');

    try {
      const { data } = await this.httpService.axiosRef.post<IStravaToken>(
        `${this.stravaApiUrl}/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`,
      );

      return data;
    } catch (error) {
      throw new HttpException(
        'Failed to generate token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async refreshToken(refreshToken: string): Promise<IStravaRefreshToken> {
    const clientId = this.configService.get('STRAVA_CLIENT_ID');
    const clientSecret = this.configService.get('STRAVA_CLIENT_SECRET');

    try {
      const { data } = await this.httpService.axiosRef.post<IStravaRefreshToken>(
        `${this.stravaApiUrl}/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`,
      );

      return data;
    } catch (error) {
      throw new HttpException(
        'Failed to refresh token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
