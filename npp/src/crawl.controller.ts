import { Controller, Get, Post, Body} from '@nestjs/common';
import { CrawlService } from './crawl.service';

@Controller('crawl')
export class CrawlController {

  constructor(private readonly crawlService: CrawlService) {}
  @Post()
  crawling(@Body() data : {targetUrl : string} ): any {
    return this.crawlService.crawling(data.targetUrl);
  }
}
