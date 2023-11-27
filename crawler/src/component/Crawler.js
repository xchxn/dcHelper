import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Crawler() {
  const [targetUrl, setTargetUrl] = useState("");
  const [data,setData] = useState([]);
  const apiUrl = 'http://localhost:3001/crawl'; // NestJS 서버 주소

  // 데이터 가져오기
  const crawler = (targetUrl) => {
    console.log(targetUrl);
    axios.post(`${apiUrl}`, {targetUrl})
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1 class="fifth">디시인사이드 갤러리 크롤링</h1>
      <p class="link">예시 "https://gall.dcinside.com/board/lists/?id=dcbest" </p>
      <input class="inputBox" type='text' value={targetUrl} onChange={(e)=>setTargetUrl(e.target.value)} placeholder='url을 입력하세요'>
      </input>
      <button class="button" onClick={()=>crawler(targetUrl)}>
        가져오기
      </button>
      <div>
        {/* data 객체를 문자열로 변환하여 출력 */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Crawler;
