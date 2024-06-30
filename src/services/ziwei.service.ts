import { Injectable } from '@nestjs/common';
import { astro, data } from 'iztro';

interface Astrolabe {
  // 姓名
  date: string;
  // 年龄
  age: number;
  // 性别
  gender: string | number;
  // 日历类型
  calendarType: 'solar' | 'lunar';
}

// // 通过阳历获取星盘信息
// const astrolabe1 = astro.bySolar("2000-8-16", 2, "女");

// // 通过农历获取星盘信息
// const astrolabe2 = astro.byLunar("2000-7-17", 2, "女");

@Injectable()
export class ZiweiService {
  // 返回json数据
  getZiwei(params: Astrolabe): object {
    const gender: '男' | '女' = params.gender === 1 ? '男' : '女';
    let ret: any;

    if (params.calendarType === 'solar') {
      ret = astro.bySolar(
        params.date,
        Number(params.age),
        gender,
      )
    }

    if (params.calendarType === 'lunar') {
      ret = astro.byLunar(
        params.date,
        Number(params.age),
        gender
      )
    }

    return {
      code: 200,
      data: {...ret, copyright: undefined}
    };
  }
}
