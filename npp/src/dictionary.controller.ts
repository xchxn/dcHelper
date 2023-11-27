import { Controller, Get, Post, Body} from '@nestjs/common';
import { dictionaryService } from './dictionary.service';

@Controller('dictionary')
export class morphemeController {

  constructor(private readonly dictionaryService: dictionaryService) {}
  @Post()
  dictionary(@Body() data : {word:string, describe:string} ): any {
    const word = data.word;
    console.log('Received input value:', word+": "+describe);

    return this.dictionaryService.dictionary(data.word, data.describe);
  }
}
