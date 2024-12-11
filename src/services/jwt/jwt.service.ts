import { IJwtAuthPayload } from '@/interfaces/jwt.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
   constructor(private readonly jwtService: JwtService) { }

   public async verifyTokenAsync(token: string): Promise<any> {
      return await this.jwtService.verifyAsync(token);
   }

   public createToken(payload: IJwtAuthPayload, expiresIn?: string): string {
      const options = expiresIn ? { expiresIn } : undefined;
      return this.jwtService.sign(payload, options);
   }

   public verifyToken(token: string): any {
      return this.jwtService.verify(token);
   }
}
