import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from 'path';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async () => {
                return {
                    transport: {
                        host: process.env.EMAIL_HOST,
                        secure: false,
                        port: process.env.EMAIL_PORT,
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASSWORD,
                        },
                    },
                    defaults: {
                        from: `"nest-modules <${process.env.EMAIL_FROM}>"`,
                    },
                    template: {
                        dir: join(__dirname, './templates'),
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }
            },
            inject: [],
        }),
    ],
})
export class EmailsModule { }
