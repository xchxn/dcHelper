import { Injectable } from '@nestjs/common';
import * as puppeteer from "puppeteer";
import { MorphemeService } from './morpheme.service';

@Injectable()
export class crawlService {
    constructor(private readonly morphemeService: MorphemeService) {} //service추가
    // https://github.com/puppeteer/puppeteer
    async crawling(url: string): Promise<any> {
        const puppeteer = require('puppeteer');
        const cheerio = require('cheerio');
        const fs = require('fs');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        //링크 담을 배열
        let arr = [];
        let arrTxt = [];

        for (let pageIdx = 1; pageIdx < 2; pageIdx++) {
            //페이지 이동
            await page.goto(`${url}&page=${pageIdx}`);
            //페이지 HTML 로드
            const content = await page.content();
            // $에 cheerio 로드
            const $ = cheerio.load(content);
            // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
            // Selector는 웹에서 개발자모드 요소 검사를 통해 복사할 수 있음
            const lists = $(".gall_tit.ub-word a:nth-child(1)");
            // 모든 리스트를 순환한다.
            lists.each((index: number, element: string) => {
                const link = $(element).attr('href'); // 링크 가져오기
                const text = $(element).text(); // 텍스트 가져오기
                //배열에 링크 추가
                if (index !== 0) {
                    arr.push(`${link}`);
                    arrTxt.push(`${text}`);
                    // morphemeService 호출
                this.morphemeService.morpheme(`${text}`);
                }
                //콘솔에 출력
                console.log(`Index: ${index}, Link: ${link}, Text: ${text}`);
            });

        }
        await browser.close();

        return { arrTxt };
    }
}