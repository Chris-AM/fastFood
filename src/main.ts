import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";


async function fastoodBackend() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create( AppModule )
  console.log('listing in port ===> ', port);
  await app.listen( port );
}

fastoodBackend();
