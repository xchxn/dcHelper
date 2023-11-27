import { Controller, Get, Post, Body} from '@nestjs/common';
import { crawlService } from './crawl.service';

@Controller('crawl')
export class CrawlController {

  constructor(private readonly crawlService: crawlService) {}
  @Post()
  crawling(@Body() data : {targetUrl : string} ): any {
    const targetUrl = data.targetUrl;
    console.log('Received input value:', targetUrl);

    return this.crawlService.crawling(`${targetUrl}`);
  }
}
