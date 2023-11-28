import { Injectable } from '@nestjs/common';
import * as puppeteer from "puppeteer";


@Injectable()
export class MorphemeService {
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
                        }
                      });
                    });
                  });
            }
        );
    }

}
