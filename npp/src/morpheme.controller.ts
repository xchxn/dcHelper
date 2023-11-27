import { Controller, Get, Post, Body} from '@nestjs/common';
import { MorphemeService } from './morpheme.service';

@Controller('morpheme')
export class MorphemeController {

  constructor(private readonly morphemeService: MorphemeService) {}
  @Post()
  morpheme(@Body() data : {text : string} ): any {
    const text = data.text;
    console.log('Received input value:', text);

    return this.morphemeService.morpheme('text');
  }
}
