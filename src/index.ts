
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { Config } from './config'


const app = NestFactory.create(ApplicationModule);
app.listen(Config.port, () => console.log(`Application is listening on port ${Config.port}`));