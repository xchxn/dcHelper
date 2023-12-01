import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Word } from './entities/word.entity';
import config from './db.config';

@Module({
  imports: [TypeOrmModule.forFeature([User, Word])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
