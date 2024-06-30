import { All, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ZiweiService } from '../services/ziwei.service';

@Controller('api')
export class ZiweiController {
  constructor(private readonly ziweiService: ZiweiService) {}

  // get 和 post 都可以
  @Post('ziwei')
  getZiwei(@Body() body: any): Object {
    return this.ziweiService.getZiwei(body);
  }
}
