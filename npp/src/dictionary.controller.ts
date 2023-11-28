import { Controller, Get, Post, Body} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {

  constructor(private readonly dictionaryService: DictionaryService) {}
  @Post()
  dictionary(@Body() data : {word:string, describe:string} ): any {
    const word = data.word;
    console.log('Received input value:', word+": "+describe);

    return this.dictionaryService.dictionary(data.word, data.describe);
  }
  @Get()
  showDictionary(@Body() data:{}): any {

    return this.dictionaryService.showDictionary();
  }
}
