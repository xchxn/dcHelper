import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import D3WordCloudComponent from './WordClouding';

function Crawler() {
  const [targetUrl, setTargetUrl] = useState("");
  const [data, setData] = useState([]);
  const [trend, setTrend] = useState([]);
  const [isTrendLoaded, setIsTrendLoaded] = useState(false);
  const apiUrl = 'http://localhost:3001/crawl'; // NestJS 서버 주소
  const getUrl = 'http://localhost:3001/morpheme'; // NestJS 서버 주소

  // 데이터 가져오기
  const crawler = (targetUrl) => {
    console.log(targetUrl);
    axios.post(`${apiUrl}`, { targetUrl })
      .then(response => {
        setData(response.data);
        console.log(response.data);
        //post후 트렌드까지 읽어오기
        //읽어온거 그래픽처리
        setTimeout(() => {
          // 5초 후 실행할 코드
          axios.get(`${getUrl}`)
          .then(response2 => {
            setTrend(response2.data);
            console.log(response2.data);
            setIsTrendLoaded(true);
          })
          .catch(error2 => {
            console.error("get error", error2);
          });
        }, 5000);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div class="container">
      <h1 class="fifth">커뮤니티 트렌드 추출기</h1>
      <p class="link">예시 "https://gall.dcinside.com/board/lists/?id=dcbest" </p>
      <input class="inputBox" type='text' value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} placeholder='url을 입력하세요'>
      </input>
      <button class="button" onClick={() => crawler(targetUrl)}>
        가져오기
      </button>
      <div>
      {isTrendLoaded && <D3WordCloudComponent items={trend} />}
      </div>
    </div>
  );
}

export default Crawler;
