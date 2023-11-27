import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '428337',
  database: 'irproject',
  entities: [],
  synchronize: true, // 개발 환경에서만 사용 (실제 환경에서는 비추천)
};

export default config;
