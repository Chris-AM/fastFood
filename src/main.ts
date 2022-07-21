import {ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {AllExceptionFilter} from "./common/filters/http-exception.filter";
import {TimeOutInterceptor} from "./common/interceptors/timeout.interceptor";


async function fastoodBackend() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create( AppModule );
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalPipes(new ValidationPipe);
  console.log('listing in port ===> ', port);
  await app.listen( port );
}

fastoodBackend();
