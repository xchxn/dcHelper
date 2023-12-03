import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Dictionary() {
  const [data, setData] = useState([]);
  const apiUrl = 'http://localhost:3001/dictionary'; // NestJS 서버 주소
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");

  const register = (word, description) => {
    console.log(word, description);

    axios.post(`${apiUrl}`, { word, description })
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    setWord("");
    setDescription("");
  };
  const makeDict = () => {
    axios.get(`${apiUrl}`)
      .then(response2 => {
        setData(response2.data);
        console.log(response2.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1 class="fifth">디시인사이드 단어 사전 등록</h1>
      <input class="inputBox" type='text' value={word} onChange={(e) => setWord(e.target.value)} placeholder='단어를 입력하세요'>
      </input>
      <input class="inputBox" type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='설명을 입력하세요'>
      </input>
      <button class="button" onClick={() => register(word, description)}>
        추가하기
      </button>
      <div>
        <button class="button" onClick={() => makeDict()} >
          단어보기
        </button>
        <ul>
        {Array.isArray(data) ? (
          data.map((word, index) => (
            <li key={index}>{word.word}: {word.description}</li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
      </div>
    </div>
  );
}

export default Dictionary;
