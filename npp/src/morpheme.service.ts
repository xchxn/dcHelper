import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/word.entity';

@Injectable()
export class MorphemeService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) { }
  //형태소를 추출해서 데이터베이스로 옮기는 서비스
  async morpheme(text: string): Promise<any> {
    let host = "nlp.bareun.ai"
    let API_KEY = "koba-EHGL23A-DYYETGI-VN7X4ZA-2RZVHUA"
    let { LanguageServiceClient, Tagger, CustomDict } = require("bareun");
    let language_service_client = new LanguageServiceClient(host, API_KEY);

    //crawl서비스마다 morpheme서비스가 수행
    //crawl에서 보내지는 text를 형태소 분석하여 명사를 데이터베이스로 보내는 작업 수행

    language_service_client.AnalyzeSyntax(`${text}`,
      (error, res) => {
        console.log('result : language_service_client.AnalyzeSyntax(text)');
        if (error) {
          throw error;
          return;
        }
        // console.log(JSON.stringify(res));
        //해당 Json에서 명사류 태그만 db에 업데이트하는 부분 작성 필요
        //체언-일반명사태그=> NNG
        //사용자사전에 등록된 것도 체크
        res.sentences.forEach((sentence) => {
          sentence.tokens.forEach((token) => {
            token.morphemes.forEach((morpheme) => {
              if (morpheme.tag === "NNG") {
                console.log(token.text.content);
                //db에서 token.text.content 검색
                //없으면 추가, 있으면 특정 값 +1
                //entity에서 값 처리할 수 있도록
                this.updateCount(token.text.content);
              }
            });
          });
        });
      }
    );
  }

  //단어를 업데이트하는 함수
  async updateCount(targetWord: string): Promise<any> {
    const existingWord = await this.wordRepository.findOne({
      where: { word: targetWord },
    });
    if (existingWord) {
      //count값 1늘리는 코드
      existingWord.count += 1;
      await this.wordRepository.save(existingWord);
    }
    else {
      const newWord = this.wordRepository.create({
        word: targetWord,
        count: 1,
      });
      await this.wordRepository.save(newWord);
    }
  }

}
