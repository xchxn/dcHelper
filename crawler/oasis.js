const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const axios = require('axios');

// https://github.com/puppeteer/puppeteer
(async () => {
    const browser = await puppeteer.launch({ headless : 'new' });
    const page = await browser.newPage();


    for (let idx = 1117673; idx < 1119673; idx++) {
        await page.goto(`https://all.jbnu.ac.kr/attch/photo/exm/esin/201901/${idx}_1_201901.jpg`);
        //페이지 HTML 로드
        const content = await page.content();

        // $에 cheerio 로드
        const $ = cheerio.load(content);


        const img = $("body > img");

        // 이미지 URL 가져오기
        const imgSrc = img.attr('src');

        if (imgSrc) {
            // 이미지 다운로드
            const response = await axios.get(imgSrc, { responseType: 'stream' });

            // 이미지를 파일로 저장
            const fileName = `${idx}_1_201901.jpg`;
            const filePath = `./pdf/${fileName}`; // 이미지를 저장할 경로 및 파일 이름

            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            console.log(`이미지 다운로드 및 저장 완료: ${filePath}`);
        } else {
            console.log(`이미지를 찾을 수 없음`);
        }
    }

    await browser.close();
})();
