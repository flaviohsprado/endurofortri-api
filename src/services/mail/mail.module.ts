//import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NodemailerService } from "./nodemailer.service";

@Module({
   imports: [
      ConfigModule.forRoot(),
   ],
   providers: [NodemailerService],
   exports: [NodemailerService],
})
export class MailModule { }