import { All, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LunarService } from '../services/lunar.service';

@Controller('api')
export class LunarController {
  constructor(private readonly lunarService: LunarService) {}

  // get 和 post 都可以
  @Post('lunar/index')
  getLunarDay(@Body() body: any): Object {
    return this.lunarService.getIndexDayInfo();
  }

  @Get('lunar/day')
  getLunarDayInfo(@Query() query: any): Object {
    const date = new Date(query.date);
    return this.lunarService.getDayInfo(date);
  }

  @Post('lunar/Fortune')
  getFortuneInfo(@Body() body: any): Object {
    const { date, gender } = body;
    const query = `根据文件中的数据，统计这几所学校小学生有多少`;
    



    return this.lunarService.getAiFortune(query);
  }
}
