import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from 'process';
import * as cookieParser from 'cookie-parser';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';



async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept, Authorization'
  });
  const config = new DocumentBuilder()
    .setTitle('Fullstack Dapp')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Fullstack Dapp')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(5000, () => console.log(`Server started on ${PORT} port`));


}

bootstrap();


// const uniswapService = app.get(UniswapService);
// const startPolling = async () => {
//   const pollingInterval = 100; // 1 seconds
//   const timeout = 60000; // 1 minute timeout for long polling
//
//   while (true) {
//     try {
//       const opportunityFound = await uniswapService.checkArbitrageOpportunity();
//
//       // Wait before polling again
//       await new Promise(resolve => setTimeout(resolve, pollingInterval));
//     } catch (error) {
//       console.error('Error during polling:', error);
//     }
//   }
// };
// await startPolling()