import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PaginationMiddleware } from '../common/middlewares/pagination.middleware';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Users.name,
        useFactory: () =>
          UsersSchema.plugin(
            require('mongoose-autopopulate'),
          ),
      },
      {
        name: Users.name,
        useFactory: () =>
          UsersSchema.plugin(
            require('mongoose-paginate-v2'),
          ),
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule  {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(PaginationMiddleware)
    .forRoutes({ path: 'v1/user', method: RequestMethod.GET })
  }
}
