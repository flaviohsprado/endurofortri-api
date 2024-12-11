import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from 'fs';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class NodemailerService {
   private transporter: Transporter;

   constructor(
      private readonly configService: ConfigService,
   ) { }

   public async sendMail(to: string, subject: string, message: string, key: any): Promise<void> {
      if (!this.transporter)
         this.createTransporter();

      this.send(to, subject, message, key);
   }

   private send(to: string, subject: string, message: string, key: string): void {
      const template = fs.readFileSync('src/common/config/mail/templates/forgot_password.html', 'utf8');

      let customizedTemplate = template.replace('{{key}}', key);
      customizedTemplate = customizedTemplate.replace('{{content}}', message);

      this.transporter.sendMail({
         to,
         from: 'noreply@codeweavers.com.br',
         subject,
         html: customizedTemplate,
      });
   }

   private createTransporter() {
      const host = this.configService.get<string>('MAIL_HOST');
      const port = this.configService.get<number>('MAIL_PORT');
      const secure = this.configService.get<boolean>('MAIL_SECURE');
      const user = this.configService.get<string>('MAIL_USER');
      const pass = this.configService.get<string>('MAIL_PASS');

      this.transporter = createTransport({
         service: 'Mailgun',
         host,
         port,
         secure,
         auth: {
            user,
            pass
         },
         ignoreTLS: true,
      });
   }
}