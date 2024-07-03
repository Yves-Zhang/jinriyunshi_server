import { Injectable } from '@nestjs/common';
import { Lunar, LunarUtil } from 'lunar-typescript';
import { conversation } from 'src/http/ai';

@Injectable()
export class LunarService {
  // 返回json数据
  getIndexDayInfo(): object {
    const ret = getLunarDayInfo(new Date());
    return {
      code: 200,
      data: { ...ret }
    };
  }

  getDayInfo(date: Date): object {
    const ret = getLunarDayInfo(date);
    return {
      code: 200,
      data: { ...ret }
    };
  }

  async getAiFortune(query: string, conversation_id?: string): Promise<object> {
    const ret = await conversation(query, conversation_id);
    const { data } = ret;
    // 代码省略
    return {
      code: 200,
      data: { data }
    };
  }
}

function getLunarDayInfo(day: Date = new Date()) {
  const lunar = Lunar.fromDate(day);
  const dayYi = lunar.getDayYi();
  const dayJi = lunar.getDayJi();

  const indexTimeYi = lunar.getTimeYi();
  const indexTimeJi = lunar.getTimeJi();

  const weekDay = lunar.getWeek();
  const weekDayChinese = lunar.getWeekInChinese();

  const yearChinese = lunar.getYearInChinese();
  const monthChinese = lunar.getMonthInChinese();
  const dayChinese = lunar.getDayInChinese();

  // 节日
  const festivals = lunar.getFestivals();

  // 干支年
  const yearGanZhi = lunar.getYearInGanZhi();

  // 干支月
  const monthGanZhi = lunar.getMonthInGanZhi();

  // 干支日
  const dayGanZhi = lunar.getDayInGanZhi();

  // 获取当天时辰列表
  const times = lunar.getTimes();
  const shichens = [];
  for (var i = 0, j = times.length; i < j; i++) {
    var time = times[i];
    const yi = LunarUtil.getTimeYi(lunar.getDayGanExact() + lunar.getDayZhiExact(), time.getGanZhi());
    const ji = LunarUtil.getTimeJi(lunar.getDayGanExact() + lunar.getDayZhiExact(), time.getGanZhi());
    shichens.push({
      time: time.getMinHm() + ' - ' + time.getMaxHm(),
      ganZhi: time.getGanZhi(),
      yi,
      ji
    });
  }

  const ret = {
    shichens,
    dayYi,
    dayJi,
    indexTimeYi,
    indexTimeJi,
    weekDay,
    weekDayChinese,
    festivals,
    yearGanZhi,
    monthGanZhi,
    dayGanZhi,
    yearChinese,
    monthChinese,
    dayChinese
  };
  return ret;
}
