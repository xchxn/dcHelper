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
        axios.get(`${apiUrl}`)
      .then(response2 => {
        setData(response2.data);
        console.log(response2.data);
      })
      .catch(error => {
        console.error(error);
      });
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
    <div class='container'>
      <h1 class="fifth">커뮤니티 사용자 단어 사전</h1>
      <div class='textBox'>
        단어 등록하기
      </div>
      <input class="inputBox" type='text' value={word} onChange={(e) => setWord(e.target.value)} placeholder='단어를 입력하세요'>
      </input>
      <input class="inputBox" type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='설명을 입력하세요'>
      </input>
      <button class="button" onClick={() => register(word, description)}>
        추가하기
      </button>
      
      <div>
        <div class='textBox'>
          단어보기
          </div>
          <button class="button" onClick={() => makeDict()} >
          새로고침
        </button>
        <ul class="wordTable">
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
