import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import D3WordCloudComponent from './WordClouding';

function Crawler() {
  const [targetUrl, setTargetUrl] = useState("");
  const [data,setData] = useState([]);
  const [trend, setTrend] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 추가

  const apiUrl = 'http://localhost:3001/crawl'; // NestJS 서버 주소
  const getUrl = 'http://localhost:3001/morpheme'; // NestJS 서버 주소


  // 데이터 가져오기
  const crawler = (targetUrl) => {
    setIsLoading(true); //로딩 시작 
    console.log(targetUrl);
    
    axios.post(`${apiUrl}`, {targetUrl})
      .then(response => {
        setData(response.data);
        console.log(response.data);
        //post후 트렌드까지 읽어오기
        //읽어온거 그래픽처리
        axios.get(`${getUrl}`)
          .then(response2 => {
              setTrend(response2.data);
              console.log(response2.data);
              setIsLoading(false); // 크롤링 완료 시 로딩 상태 해제
            })
            .catch(error2 => {
              console.error("get error",error2);
            });
      })
      .catch(error => {
        console.error(error);
      });
      // setTargetUrl("");
  };

  useEffect(() => {
    if (isLoading === false) {
      // 크롤링 및 트렌드 데이터 로딩이 완료된 경우에만 실행
      // WordClouding 컴포넌트 렌더링
    }
  }, [isLoading, trend]);

  return (
    <div>
      <h1 class="fifth">크롤링</h1>
      <p class="link">예시 "https://gall.dcinside.com/board/lists/?id=dcbest" </p>
      <input class="inputBox" type='text' value={targetUrl} onChange={(e)=>setTargetUrl(e.target.value)} placeholder='url을 입력하세요'>
      </input>
      <button class="button" onClick={()=>crawler(targetUrl)}>
        가져오기
      </button>
        {isLoading ? (
        <p>Loading...</p> // 로딩 중일 때 보여줄 내용
      ) : (
        <div style={{ height: '500px' }}>
          <D3WordCloudComponent items={trend} />
        </div>
      )}
    </div>
  );
}

export default Crawler;
