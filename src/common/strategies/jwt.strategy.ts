import { IJwtAuthPayload } from '@/interfaces/jwt.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor() {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: process.env.JWT_SECRET,
      });
   }

   public async validate(payload: IJwtAuthPayload) {
      return {
         id: payload.id,
         email: payload.email,
         name: payload.name,
      };
   }
}
