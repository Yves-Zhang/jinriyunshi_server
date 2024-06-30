import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ZiweiController } from './controllers/ziwei.controller';
import { ZiweiService } from './services/ziwei.service';
import { LunarService } from './services/lunar.service';
import { LunarController } from './controllers/lunar.controller';

@Module({
  imports: [],
  controllers: [AppController, ZiweiController, LunarController],
  providers: [AppService, ZiweiService, LunarService],
})
export class AppModule { }
