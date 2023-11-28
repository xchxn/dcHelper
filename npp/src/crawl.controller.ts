import { Controller, Get, Post, Body} from '@nestjs/common';
import { CrawlService } from './crawl.service';

@Controller('crawl')
export class CrawlController {

  constructor(private readonly crawlService: CrawlService) {}
  @Post()
  crawling(@Body() data : {targetUrl : string} ): any {
    const targetUrl = data.targetUrl;
    console.log('Received input value:', targetUrl);

    return this.crawlService.crawling(`${targetUrl}`);
  }
}
