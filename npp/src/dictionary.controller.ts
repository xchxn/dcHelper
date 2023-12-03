import { Controller, Get, Post, Body} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { Dict } from './entities/dict.entity';

@Controller('dictionary')
export class DictionaryController {

  constructor(private readonly dictionaryService: DictionaryService) {}
  @Post()
  dictionary(@Body() data : {word:string, description :string} ): any {
    return this.dictionaryService.dictionary(data.word, data.description);
  }
  @Get()
  showDictionary(): Promise<Dict[]> {
    return this.dictionaryService.showDictionary();
  }
}
