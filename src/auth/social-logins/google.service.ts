import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

import { plainToHash } from '../utils/handleBCrypt';
import { Users, UsersDocument } from 'src/user/schema/user.schema';
import { Response } from 'express';

@Injectable()
export class GoogleService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly eventEmiiter: EventEmitter2,
        @InjectModel(Users.name)
        private readonly userModel: Model<UsersDocument>,
    ) { }

    async googleAuth(token: string, request: Response) {
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
            phoneNumber: 0,
            password: await plainToHash(token),
            avatar: googleUser.picture,
            google: true
        };
        const userDB = await this.userModel.findOne({
            email: googleUser.email,
        });
        let user: Users & Document<any, any, any> & {
            _id: Types.ObjectId;
        };
        if (!googleUser) {
            throw new UnauthorizedException();
        }

        if (!userDB) {
            user = await this.userModel.create(userToCreate);
        } else {
            user = userDB;
            user.google = true;
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

        return data;
    }
}
