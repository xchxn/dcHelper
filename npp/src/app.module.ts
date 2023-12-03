import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CrawlService } from './crawl.service';
import { CrawlController } from './crawl.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MorphemeController } from './morpheme.controller';
import { MorphemeService } from './morpheme.service';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { User } from './entities/user.entity';
import { Word } from './entities/word.entity';
import { Dict } from './entities/dict.entity';

@Module({
  imports: [DatabaseModule,HttpModule,
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'irproject',
    entities: [User, Word, Dict],
    synchronize: true,
    logging: true,
  }),],
  controllers: [CrawlController, AppController, UserController, MorphemeController, DictionaryController],
  providers: [CrawlService, AppService, UserService, MorphemeService, DictionaryService],
})
export class AppModule {}
