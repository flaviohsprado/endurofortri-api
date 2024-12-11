import { NodemailerService } from '@/services/mail/nodemailer.service';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import { createTransport } from 'nodemailer';

jest.mock('fs');
jest.mock('nodemailer', () => ({
   createTransport: jest.fn(),
}));

describe('NodemailerService', () => {
   let service: NodemailerService;
   let configService: ConfigService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            NodemailerService,
            {
               provide: ConfigService,
               useValue: {
                  get: jest.fn(),
               },
            },
         ],
      }).compile();

      service = module.get<NodemailerService>(NodemailerService);
      configService = module.get<ConfigService>(ConfigService);
   });

   describe('sendMail', () => {
      it('should create transporter if not initialized and call send', async () => {
         const createTransporterSpy = jest.spyOn<any, any>(service, 'createTransporter');
         const sendSpy = jest.spyOn<any, any>(service, 'send').mockImplementation();

         await service.sendMail('test@example.com', 'Test Subject', 'Test Message', 'Test Key');

         expect(createTransporterSpy).toHaveBeenCalled();
         expect(sendSpy).toHaveBeenCalledWith('test@example.com', 'Test Subject', 'Test Message', 'Test Key');
      });
   });

   describe('send', () => {
      it('should read template and send mail with correct parameters', () => {
         const readFileSyncMock = fs.readFileSync as jest.Mock;
         readFileSyncMock.mockReturnValue('<html>{{key}}{{content}}</html>');

         const sendMailMock = jest.fn();
         service['transporter'] = { sendMail: sendMailMock } as any;

         service['send']('test@example.com', 'Test Subject', 'Test Message', 'Test Key');

         expect(readFileSyncMock).toHaveBeenCalledWith('src/common/config/mail/templates/forgot_password.html', 'utf8');
         expect(sendMailMock).toHaveBeenCalledWith({
            to: 'test@example.com',
            from: 'noreply@codeweavers.com.br',
            subject: 'Test Subject',
            html: '<html>Test KeyTest Message</html>',
         });
      });
   });

   describe('createTransporter', () => {
      it('should create transporter with correct configuration', () => {
         (configService.get as jest.Mock)
            .mockReturnValueOnce('smtp.mailgun.org')
            .mockReturnValueOnce(587)
            .mockReturnValueOnce(false)
            .mockReturnValueOnce('user')
            .mockReturnValueOnce('pass');

         service['createTransporter']();

         expect(createTransport).toHaveBeenCalledWith({
            service: 'Mailgun',
            host: 'smtp.mailgun.org',
            port: 587,
            secure: false,
            auth: {
               user: 'user',
               pass: 'pass',
            },
            ignoreTLS: true,
         });
      });
   });
});