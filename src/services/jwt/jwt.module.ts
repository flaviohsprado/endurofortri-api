import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

@Module({
   imports: [
      JwtModule.register({
         secret: String(process.env.JWT_SECRET),
      }),
   ],
   providers: [JwtTokenService],
   exports: [JwtTokenService],
})
export class JwtConfigModule { }
