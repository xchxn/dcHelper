import { Injectable } from '@nestjs/common';
import { Puppeteer } from "puppeteer";
import * as puppeteer from "puppeteer";
import { MorphemeService } from './morpheme.service';

@Injectable()
export class CrawlService {
    constructor(private readonly morphemeService: MorphemeService) { }
    async crawling(url: string): Promise<any> {
        const puppeteer = require('puppeteer');
        const cheerio = require('cheerio');
        const fs = require('fs');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        console.log(`수신 url: ${url}`);
        //링크 담을 배열
        let arr : Array<string> = [];
        let arrTxt : Array<string> = [];

        for (let pageIdx = 1; pageIdx < 2; pageIdx++) {
            //페이지 이동
            await page.goto(`${url}&page=${pageIdx}`);
            //페이지 HTML 로드
            const content = await page.content();
            // $에 cheerio 로드
            const $ = cheerio.load(content);
            // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
            // Selector는 웹에서 개발자모드 요소 검사를 통해 복사할 수 있음
            const lists = $(".ub-content.us-post");

            //테이블 초기화
            this.morphemeService.clearTable();
            // 모든 리스트를 순환한다.
            lists.each((index: number, element: any) => {
                console.log(`Index: ${index}`);
                const link : string = $(element).find('.gall_tit a').attr('href'); // 링크 가져오기
                const text : string = $(element).find('.gall_tit a').text(); // 텍스트 가져오기
                const viewCount : number = parseInt($(element).find('.gall_count').text(), 10); // 조회수
                const recommend : number = parseInt($(element).find('.gall_recommend').text(), 10); // 추천수
                const subject : string = $(element).find('.gall_subject b').text();
                const gallnumber : string = $(element).find('.gall_num').text(); // 게시글 주제
                if(!["공지", "설문", "뉴스"].includes(subject) && !["공지", "설문", "뉴스"].includes(gallnumber)){
                // morphemeService 호출
                    this.morphemeService.morpheme(`${text}`,viewCount,recommend);
                }
                //콘솔에 출력
                console.log(`Link: ${link}, Text: ${text}, view: ${viewCount}, recommend: ${recommend}`);
            });
        }
        await browser.close();
        

        return {};
    }
}