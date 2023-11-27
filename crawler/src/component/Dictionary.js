import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Dictionary() {
  const [data,setData] = useState([]);
  const apiUrl = 'http://localhost:3001/dictionary'; // NestJS 서버 주소
  const [word, setWord] = useState("");
  const [describe, setDescribe] = useState("");

  const register = (word, describe) => {
    console.log(word, describe);
    
    axios.post(`${apiUrl}`, { word, describe })
      .then(response => {
        setData(response.data);
        console.log(response.data);
        
      })
      .catch(error => {
        console.error(error);
      });
     setWord("");
    setDescribe("");
  };

  return (
    <div>
      <h1 class="fifth">디시인사이드 단어 사전 등록</h1>
      <input class="inputBox" type='text' value={word} onChange={(e)=>setWord( e.target.value )} placeholder='단어를 입력하세요'>
      </input>
      <input class="inputBox" type='text' value={describe} onChange={(e)=>setDescribe( e.target.value )} placeholder='설명을 입력하세요'>
      </input>
      <button class="button" onClick={()=>register(word,describe)}>
        추가하기
      </button>
    </div>
  );
}

export default Dictionary;
