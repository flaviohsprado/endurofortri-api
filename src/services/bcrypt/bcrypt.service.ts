import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
   public async createHash(string: string): Promise<string> {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(string, salt);
   }

   public async checkHash(string: string, hash: string): Promise<boolean> {
      return await bcrypt.compare(string, hash);
   }
}
