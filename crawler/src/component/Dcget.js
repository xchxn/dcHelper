import React from 'react';
import { useEffect, useState } from 'react';

function Dcget() {
    const [data, setData] = useState([]);
    const [makeOutput, setMakeOutput] = useState([]);

    useEffect(() => {
        const puppeteer = require('puppeteer');
        const cheerio = require('cheerio');
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            //페이지 이동
            await page.goto('https://gall.dcinside.com/board/lists/?id=dcbest');
            //페이지 HTML 로드
            const content = await page.content();
            // $에 cheerio 로드
            const $ = cheerio.load(content);
            // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
            // Selector는 웹에서 개발자모드 요소 검사를 통해 복사할 수 있음
            const lists = $(".gall_tit.ub-word a.reply_numbox");

            const output = [];
            // 모든 리스트를 순환한다.
            lists.each((index, element) => {
                const link = $(element).attr('href'); // 링크 가져오기
                const text = $(element).text(); // 텍스트 가져오기
                const item = `Index: ${index}, Link: ${link}, Text: ${text}`;
                output.push(item);
            });

            setMakeOutput(output);
            await browser.close();
        })();
    }, []);

    return (
        <div>
            {makeOutput.map((output, index) => (
                <p key={index}>{output}</p>
            ))}
        </div>
    );

}
export default Dcget();

