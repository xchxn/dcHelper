import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { crawlService } from './crawl.service';
import { CrawlController } from './crawl.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MorphemeController } from './morpheme.controller';
import { MorphemeService } from './morpheme.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { User } from './entities/user.entity';

@Module({
  imports: [DatabaseModule,HttpModule,
    TypeOrmModule.forRoot({
    type: 'mysql',            // 데이터 베이스 타입
    host: 'localhost',        // local 환경으로 진행
    port: 3306,               // mysql은 기본 port는 3306
    username: 'root',         // mysql은 기본 user는 root로 지정
    password: 'password',         // 본인의 mysql password 
    database: 'irproject',        // 연결할 데이터 베이스명
    entities: [User],        // 데이터 베이스와 연결할 entity
    synchronize: true,        // entity 테이블을 데이터베이스와 동기화할 것인지
    logging: true,            // 콘솔 창에 log를 표시할 것인지
  }),],
  controllers: [CrawlController, AppController, UserController, MorphemeController],
  providers: [crawlService, AppService, UserService, MorphemeService],
})
export class AppModule {}
