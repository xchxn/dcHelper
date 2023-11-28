import { Injectable } from '@nestjs/common';
import * as puppeteer from "puppeteer";

@Injectable()
export class DictionaryService {
    async dictionary( word:string, describe:string ): Promise<any> {
        let host = "nlp.bareun.ai"
        let API_KEY = "koba-EHGL23A-DYYETGI-VN7X4ZA-2RZVHUA"
        let { LanguageServiceClient, Tagger, CustomDict } = require("bareun");
        let language_service_client = new LanguageServiceClient(host);

        let dict = new CustomDict("game", host, undefined, API_KEY);

        (async () => {
            let set = new Set(["지지", "캐리", "던전", "현피", "세계관", "만렙", "어그로", "치트키", "퀘스트", "본캐", "로밍", "방사", "딜러", "버스", "사플"]);
            dict.copy_cp_set(set);

            let success: any = await dict.update();
            console.log("result :  dict.update() - " + success);

            await dict.read_np_set_from_file(__dirname + "/game_dict.txt");
            console.log("result :  dict.load() - " + JSON.stringify([...dict.word_sets.np_set]));
            let success2 = await dict.update();
            console.log("result :  dict.update() - " + success);

            let res = await dict.client.async_get_list();
            console.log("async_get_list() : " + JSON.stringify(res, null, 2));

            await dict.load();

            let res2 = await dict.clear();
            console.log("clear() : " + JSON.stringify(res, null, 2));
        })();

    }
    async showDictionary() : Promise<any>{

    }
}

