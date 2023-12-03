import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Dict } from './entities/dict.entity'
import * as puppeteer from "puppeteer";

@Injectable()
export class DictionaryService {
    constructor(
        @InjectRepository(Dict)
        private readonly dictRepository: Repository<Dict>,
      ) { }
    async dictionary( word:string, description:string ): Promise<any> {
        let host = "nlp.bareun.ai"
        let API_KEY = "koba-EHGL23A-DYYETGI-VN7X4ZA-2RZVHUA"
        let { LanguageServiceClient, Tagger, CustomDict } = require("bareun");
        let language_service_client = new LanguageServiceClient(host);

        let dict = new CustomDict("game", host, undefined, API_KEY);

        (async () => {
            let set = new Set([word]);
            dict.copy_np_set(set);

            let success: any = await dict.update();
            console.log("result :  dict.update() - " + success);

            let res = await dict.client.async_get_list();
            console.log("async_get_list() : " + JSON.stringify(res, null, 2));

            await dict.load();


            // let res2 = await dict.clear();
            // console.log("clear() : " + JSON.stringify(res, null, 2));
        })();
        //데이터 베이스에도 추가하는 부분
        const newDict = this.dictRepository.create({
            word: word,
            description: description,
          });
          await this.dictRepository.save(newDict);
    }
    async showDictionary() : Promise<Dict[]>{
        return this.dictRepository.find({
            select: {
                word: true,
                description: true,
            },
        });
    }
}

