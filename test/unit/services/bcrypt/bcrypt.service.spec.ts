import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '../../../../src/services/bcrypt/bcrypt.service';

describe('BcryptService', () => {
   let service: BcryptService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [BcryptService],
      })
         .useMocker(() => createMock())
         .compile();

      service = module.get<BcryptService>(BcryptService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });

   it('should hash a password correctly', async () => {
      const passwordHashed = await service.createHash('password');

      expect(await service.checkHash('password', passwordHashed)).toBe(true);
   });
});
