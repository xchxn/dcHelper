import { Controller, Get, Post, Body} from '@nestjs/common';
import { MorphemeService } from './morpheme.service';
import { stringify } from 'querystring';
import { Word } from './entities/word.entity';

@Controller('morpheme')
export class MorphemeController {
  constructor(private readonly morphemeService: MorphemeService) {}

  @Post()
  morpheme(@Body() data : {text : string, view : number, recom : number} ): any {
    return this.morphemeService.morpheme(data.text , data.view, data.recom);
  }

  @Get()
  findAll(): Promise<Word[]> {
    return this.morphemeService.findAll();
  }
}
