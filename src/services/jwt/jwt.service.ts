import { IJwtAuthPayload } from '@/interfaces/jwt.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
   constructor(private readonly jwtService: JwtService) { }

   public async checkToken(token: string): Promise<any> {
      return await this.jwtService.verifyAsync(token);
   }

   public createToken(payload: IJwtAuthPayload): string {
      return this.jwtService.sign(payload);
   }
}
