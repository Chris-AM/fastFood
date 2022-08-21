import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UsersDocument } from '../user/schema/user.schema';

@Module({})
export class EventEmailModule {

    constructor(private readonly mailerService: MailerService){}

    @OnEvent('user.logged')
    handleCreatedUser(user: any) {
        console.log('logged in', user)
    }

    @OnEvent('user.created')
    handleLoggedUser(user: UsersDocument) {
        this.mailerService.sendMail({
            to: user.email,
            template: 'welcome',
            subject: `Hola ${user.name} te damos la bienvenida`,
            context: {
                name: user.name
            }
        })
    }
}
