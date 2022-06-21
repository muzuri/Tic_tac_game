import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
// import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: 'my-senescret',
      resave: false,
      saveUninitialized: true,
      cookie:{
        maxAge:6000000,
      }
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
