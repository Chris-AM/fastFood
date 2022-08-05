import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AllExceptionFilter } from "./common/filters/http-exception.filter";
import { TimeOutInterceptor } from "./common/interceptors/timeout.interceptor";


async function fastoodBackend() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create( AppModule );
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalPipes(new ValidationPipe);
  console.log('listing in port ===> ', port);
  const options = new DocumentBuilder()
  .setTitle('FastFood App')
  .setDescription('MVP')
  .setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true
    }
  });
  await app.listen( port );
}

fastoodBackend();
