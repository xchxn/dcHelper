import { Controller, Get, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';
import { crawlService } from './crawl.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  getNumber(a:number, b: number): number{
    return this.appService.getNumber(5, 10);
  }
}
