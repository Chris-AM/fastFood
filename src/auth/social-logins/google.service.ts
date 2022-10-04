import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { plainToHash } from '../utils/handleBCrypt';
import { Users, UsersDocument } from 'src/user/schema/user.schema';
import { Request } from 'express';

@Injectable()
export class GoogleService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly eventEmiiter: EventEmitter2,
        @InjectModel(Users.name)
        private readonly userModel: Model<UsersDocument>,
    ) { }

    async googleAuth(token: string, request: Request) {
        const googleId = process.env.GOOGLE_ID;
        const client = new OAuth2Client(googleId);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: googleId,
        });
        const googleUser = ticket.getPayload();
        const userToCreate = {
            name: googleUser.name,
            email: googleUser.email,
            adress: 'Desde google',
            phoneNumber: 0,
            password: await plainToHash(token),
            avatar: googleUser.picture,
        };
        let user = await this.userModel.findOne({
            email: googleUser.email,
        });

        if (!googleUser) {
            throw new UnauthorizedException();
        }

        if (!user) {
            user = await this.userModel.create(userToCreate);
        }

        const flatUser = user.toObject();
        delete flatUser.password;
        const payload = { id: flatUser._id };
        const accessToken = this.jwtService.sign(payload);
        const data = {
            accessToken,
            user: flatUser,
        };

        this.eventEmiiter.emit('user.logged', data);

        console.log('debug data', data);
        return data;
    }
}
